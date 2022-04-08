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
        <td>{privateValues[i * size + j]}</td>
        <!-- <td>{`${i}, ${j}`}</td> -->
      {/each}
    </tr>
  {/each}
</table>

<style>
  table {
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid black;
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
    width: 85px;
    height: 85px;
  }
  th {
    color: white;
  }
  @media print {
    table {
      width: 100%;
      aspect-ratio: 1/1;
      margin-bottom: 1rem;
      float: left;
      break-after: true;
    }
    th {
      color: black;
    }
  }
</style>
