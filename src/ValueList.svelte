<script>
  import { values } from "./stores";

  let newValue = "";
  let collapsed = true;
  let multi = false;

  function addValue() {
    if (newValue) {
      if (multi) {
        $values = [...$values, ...newValue.split("\n")];
      } else {
        $values = [...$values, newValue];
      }
    }

    newValue = "";
  }
  function deleteValue(selectedValue) {
    $values = $values.filter((value, index) => index !== selectedValue);
  }
</script>

<h1>Values ({$values.length})</h1>
<h2>Please enter a new value.</h2>

<button on:click={() => (multi = !multi)}>{multi ? "Single" : "Multi"}</button
><br />
{#if multi}
  <p>Separate each value by a new line (press enter)</p>
  <textarea cols="30" rows="10" bind:value={newValue} />
{:else}
  <input type="text" bind:value={newValue} />
{/if}
<br />
<button on:click={addValue}>Submit!</button>
<hr />

{#if collapsed}
  <button on:click={() => (collapsed = false)}>Show values</button>
{:else}
  <button on:click={() => (collapsed = true)}>Hide values</button>
  <ul>
    {#each $values as value, i}
      <li>
        {value} <span class="delete" on:click={() => deleteValue(i)}>X</span>
      </li>
    {:else}
      <p>No values yet!</p>
    {/each}
  </ul>
{/if}

<style>
  ul {
    padding: 0;
    list-style: none;
  }
  li {
    font-size: large;
    padding: 0.1rem;
  }
  .delete {
    cursor: pointer;
    font-weight: bold;
    outline: red;
    margin-left: 10px;
  }
</style>
