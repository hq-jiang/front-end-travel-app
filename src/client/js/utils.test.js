import { getDestination } from './utils';

test("Test days until trip calculation", () => {

  document.body.innerHTML = `
    <form>
      <label class="grid-item-label" for="input-destination"> Destination </label>
      <input class="grid-item-input" type="text" id="input-destination" value="New York" placeholder="Destination">
    </form>
  `;

  expect(getDestination()).toBe("New+York");
})
