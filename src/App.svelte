<script lang="ts">
  import BingoCard from "./BingoCard.svelte";
  import ValueList from "./ValueList.svelte";
  import { values } from "./stores";
  let numCards = 10;
  let bingoName = "Bingo Bongo";
  let size = 5;
</script>

<main>
  <div class="config">
    <h1>Bingo card generator!</h1>
    <label for="numCards">How many cards?</label>
    <input type="number" id="numCards" bind:value={numCards} /><br />
    <label for="bingoName">Name of the Game?</label>
    <input type="text" id="bingoName" bind:value={bingoName} />
    <label for="size">Size of the card? ({size}x{size}) (at least 2)</label>
    <input type="number" id="size" bind:value={size} min="2" />
  </div>
  <ValueList />
  <hr />
  {#if $values.length >= size * size}
    <button
      on:click={() => {
        window.print();
      }}
      class="print_button">Print</button
    >
  {/if}
</main>
{#if size < 2}
  <p>I won't generate cards that small.</p>
{:else if $values.length >= size * size}
  <section class="cards">
    {#each Array(numCards) as _}
      <BingoCard {size} name={bingoName} />
    {/each}
  </section>
{:else}
  <p>Please add at least {size * size} values</p>
{/if}

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 100vw;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2em;
    padding-bottom: 5em;
  }

  /* @media (max-width: 640px) {
    h1 {
      font-size: 2em;
    }
  } */
  @media print {
    main,
    .print_button {
      display: none;
    }
    .cards {
      display: block;
    }
  }
</style>
