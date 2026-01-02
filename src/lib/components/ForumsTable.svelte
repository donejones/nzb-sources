<script lang="ts">
  import type { Forum } from '@/lib/data/forumStructure';
  import { strings, langStore, regLabel } from '@/lib/i18n';

  export let rows: Forum[] = [];

  let search = '';
  let sortKey: 'name' | 'registration' | 'content' = 'name';
  let sortDir: 'asc' | 'desc' = 'asc';

  function setSort(k: 'name' | 'registration' | 'content') {
    if (k === sortKey) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    else {
      sortKey = k;
      sortDir = 'asc';
    }
  }

  function rowMatchesSearch(r: Forum, q: string) {
    const big = [r.name, r.id, r.registration, r.content, r.opened].join(' ');
    return big.toLowerCase().includes(q);
  }

  let filtered: Forum[] = rows;
  $: filtered = rows.filter((r) =>
    search.trim() ? rowMatchesSearch(r, search.toLowerCase()) : true
  );

  let sorted: Forum[] = filtered;
  $: sorted = [...filtered].sort((a, b) => {
    const av = sortKey === 'name' ? a.name : sortKey === 'registration' ? a.registration : a.content;
    const bv = sortKey === 'name' ? b.name : sortKey === 'registration' ? b.registration : b.content;
    return sortDir === 'asc'
      ? av.localeCompare(bv, undefined, { sensitivity: 'base' })
      : bv.localeCompare(av, undefined, { sensitivity: 'base' });
  });
</script>

<div class="mb-4">
  <input
    class="input input-bordered w-full"
    placeholder={strings[$langStore].actions.searchForumsPlaceholder}
    bind:value={search}
  />
</div>

<div class="max-h-[500px] overflow-auto rounded-lg shadow">
  <table class="table-zebra table w-full">
    <thead class="bg-base-300 sticky">
      <tr>
        <th class="cursor-pointer" on:click={() => setSort('name')}>
          {strings[$langStore].forumHeaders.forum}
        </th>
        <th class="cursor-pointer" on:click={() => setSort('registration')}>
          {strings[$langStore].tableHeaders.registration}
        </th>
        <th class="cursor-pointer" on:click={() => setSort('content')}>
          {strings[$langStore].tableHeaders.content}
        </th>
        <th>{strings[$langStore].forumHeaders.opened}</th>
      </tr>
    </thead>

    <tbody>
      {#each sorted as r}
        <tr>
          <td class="font-medium">
            {#if r.name}
              {r.name}
            {:else}
              <span class="italic opacity-50">{strings[$langStore].labels.unknown}</span>
            {/if}
          </td>
          <td>
            <span
              class="badge {r.registration === 'open'
                ? 'badge-success'
                : r.registration === 'closed'
                  ? 'badge-error'
                  : r.registration === 'invite only'
                    ? 'badge-warning'
                    : 'badge-info'}"
            >
              {regLabel($langStore, r.registration)}
            </span>
          </td>
          <td>{r.content || '—'}</td>
          <td>
            {#if r.opened && r.opened !== 'never'}
              {r.opened}
            {:else if r.opened === 'never'}
              <span class="text-error">{strings[$langStore].forumHeaders.never}</span>
            {:else}
              <span class="opacity-50">—</span>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
