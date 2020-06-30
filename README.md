# Go, Go, Bananas

This was a really fun project done while I was in bootcamp. I started this game in
vanilla JS, but after we learned React, I rebuilt it.

## Concept

The bananas are falling! Catch them or be the laughingstock of banana-land!

## Lessons Learned

During this project, I really came to love Redux. The separation of 'Control' and 'View'
makes a tremendous difference in keeping track of state. In the future, given the option,
I would avoid the React Component lifecycle in lieu of dispatching Redux actions.

I also tried using CSS animation to move each banana from the top to the bottom of the
window. In the end, this felt hacked together, and when I serialize my state, it doesn't
know where the bananas were at that point. This could make things difficult to debug if
there were an issue around banana position.

## Live demo

I have placed a build of this game in the repo to provide a [demo of the game](https://aurmer.github.io/banana-grabber)

## Tech Used

- React
- Redux
- React-bootstrap
- create-react-app

## License

[MIT License](LICENSE.md)
