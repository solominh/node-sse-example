# Server Send Event Example

## How to start

- `yarn install`
- `yarn start`

## Main files

- `routes/index.js`

  - Handle events route `router.get("/events", cors(), (req, res) => {`

- `views/index.hbs`

  - Setup client `EventSource`
  - Need an EventSource polyfill: `public/javascripts/eventsource.js` from `https://github.com/Yaffle/EventSource/`
  - Listen to 3 events:
    - Default event: `message`
    - Custom event: `event`
    - Custom event: `pushNotification`

- Send push notification to all clients

  - `routes/admin.js` and `views/admin.hbs`
  - Handle admin page to send push notification to all connected clients
  - `routes/index.js`:
    - `router.post("/pushNotification", function(req, res, next) {`
    - Send message to all connections

- Send push notification to a client
  - Create `EventSource` with a query string:
    - `views/hbs`:
    ```JavaScript
    const id = Date.now();
    const evtSource = new EventSource(`/events?id="${id}"`);
    ```
    - `routes/index.js`:
    ```JavaScript
    const id = req.query.id;
    connections[id] = { res};
    ```

## Reference

- `https://github.com/rexxars/sse-channel`
  - Use this library to handle some events such as: `error`, `connect`, `disconnect`, `retry`
