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

  function clearValues() {
    $values = [];
  }
</script>

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

<p><b>Values: {$values.length}</b></p>

<button class="clear" on:click={clearValues}>Clear all values</button>

<button on:click={() => (collapsed = !collapsed)}>
  {collapsed ? "Expand" : "Collapse"} values
</button>

{#if !collapsed}
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
    margin-left: 10px;
  }

  button.clear {
    background-color: darkred;
    color: white;
  }

  button.clear:hover {
    background-color: red;
    outline: 2px solid white;
  }
</style>
