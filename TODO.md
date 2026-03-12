- [x] Dockerize the project
- Rename agents
- Process queue
- Emojis
- Refine the prompt so it always provides pricing correctly
- Refine prompts for shorter responses
- Refine the prompt so it can provide the right checkout URL
- Restart periodically every 30 minutes?
- Clean `\n`
- Goodbye intent
- Follow up with customers who did not buy
- Handle incoming stickers
- [x] Replace "I did not understand" with a more natural fallback
- [ ] Handle split messages such as [how much, the product]
  A possible approach is checking whether there is an active process and using a fallback message if so.
- More product information
- [ ] Prevent role injection


#############################
- [x] state global
- [x] Dependency injection style setup
In `flows` the export can be changed to default and loaded through an `index.js`.
That would allow adding a file and having it picked up automatically in `app.js`.

#############################
SmartFlow

- Use the cheapest and fastest model possible to classify intent
  and select the ideal flow
- The selected flow will then execute...
