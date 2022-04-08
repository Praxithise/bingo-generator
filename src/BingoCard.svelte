<script>
  import { values } from "./stores";

  export let size = 5;
  export let name;
  const getRandomUniqueSongs = () => {
    const randomValues = [];

    while (randomValues.length < size * size) {
      const randomIndex = Math.floor(Math.random() * $values.length);
      const randomValue = $values[randomIndex];

      if (!randomValues.includes(randomValue)) {
        randomValues.push(randomValue);
      }
    }

    return randomValues;
  };
  let privateValues;
  $: $values, size, (privateValues = getRandomUniqueSongs());
</script>

<table>
  <thead>
    <tr>
      <th colspan={size}> {name} </th>
    </tr>
  </thead>
  {#each Array(size) as _, i}
    <tr>
      {#each Array(size) as _, j}
        <td style:width={`${Math.round(100 / size)}%`}>
          <div>
            {privateValues[i * size + j]}
          </div>
        </td>
      {/each}
    </tr>
  {/each}
</table>

<style>
  table {
    width: min(768px, 100vw);
    padding: 1em;
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid black;
    break-before: page;
    break-inside: avoid-page;
  }
  thead {
    background-color: black;
    font-size: larger;
  }
  td,
  th {
    border: 1px solid black;
    padding: 1rem 0.5rem;
  }
  td {
    text-align: center;
    position: relative;
  }

  td::after {
    content: "";
    display: block;
    margin-top: 100%;
  }

  td div {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    inset: 0;
    padding: 1rem 0.5rem;
  }

  th {
    color: white;
  }
  @media print {
    @page {
      /* size: A4 landscape; */
    }
    table {
      width: 100%;
      margin-bottom: 1rem;
      float: left;
    }
    th {
      color: black;
    }
  }
</style>
