# Spoonman

Small app that gets integrated into TF2 as the Message of the Day (MOTD). There isn't much documentation for what the in-game browser is. There's [old documentation](/TODO.tmp) that said it was Internet Explorer under the hood, and that the maximum bundle size was 2KB.

This app is over 40KB, and the CSS animation that triggers if you hover over the title text "SPOONMAN" is one that I don't think every browser can perform:

```css
transform: scaleX(-1);
```

## Unfurl

I put a line break `\n` in the `description` string. It looks the way I'd hoped in Discord, but Slack ignores it. I also put one at the end to test, and it doesn't really look like there's an extra line break at the end, so they're likely stripping whitespace before rendering.

```js
{
  description: `Server IP: ${SERVER_IP}\nDiscord: ${DISCORD_INVITE_LINK}\n`,
  // ...
}
```

<table>
  <tbody>
    <tr>
      <td><b>Discord</b></td>
      <td><b>Slack</b></td>
    </tr>
    <tr>
      <td><img src="https://i.imgur.com/o6R65BN.png" /></td>
      <td><img src="https://i.imgur.com/2moEEcs.png" /></td>
    </tr>
        <tr>
      <td><img src="https://i.imgur.com/hQ5BHuE.png" /></td>
      <td><img src="https://i.imgur.com/xjd6LCNm.png" /></td>
    </tr>
  </tbody>
</table>

**TODO**

- Update `[old documentation](/TODO.tmp)`
- Update _"This app is over 40KB"_
- Update specific browser support for `transform: scaleX(-1)`
- Add/replace GitHub code snippet in for example `description` string
