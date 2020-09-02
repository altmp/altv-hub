# alt:V Hub Files

alt:V Hub Files is a reference point to post your resources for other users to explore. This repository allows the hub client to pull the compiled resources into the single page application and display them for easy viewing.

Simply create a pull request with a folder for your github username and a json file with your resource information.

[Visit alt:V for the GTA:V Multiplayer Client Information](https://altv.mp)

## Few Simple Rules

Tags must be in the included list below.

Cover links must have `.jpg, .jpeg, or .png`.

Cover links must be on `imgur`.

Description must not be longer than 750 characters.

`cli` refers to if your resource has install instructions in an `.altv` file. [See Here](https://github.com/stuyk/altv-installer)

## Example JSON Structure for Resource

```js
{
  "title": "Quickstart Repository",
  "url": "https://github.com/Stuyk/altv-quickstart",
  "description": "A starting point for starting an alt:V server with chat, commands, etc.",
  "tags": ["boilerplate", "javascript", "quickstart"],
  "cover": "https://i.imgur.com/0t0vDFE.jpg",
  "cli": false
}
```

## Valid Tags

```diff
+ authorization
+ boilerplate
+ c++
+ csharp
+ data
+ gamemode
+ interface
+ javascript
+ lua
+ map
+ mlo
+ ped
+ player
+ tool
+ typescript
+ utility
+ vehicle
```

### boilerplate

A boilerplate to easily boot up an alt:V server using a specific language.

### csharp

If your resource is written partially in C# / CSharp.

### javascript

If your resource is written partially in JavaScript.

### typescript

If your resource is written partially in Typescript.

### lua

If your resource is written partially in Lua.

### c++

If your resource is written partially in C++

### data

If your resource is a data dump or useful data for constructing scripts.

### gamemode

If your resource is a full gamemode that you can simply download and run.

### interface

If your resource includes some form of user interface.

### vehicle

If your resource includes some form of vehicle related scripting.

### player

If your resource includes some form of player related scripting.

### ped

If your resource includes some form of pedestrian related scripting.

### utility

If your resource includes utilities to allow functionality like blips, notifications, etc.

### authorization

If your resource includes a form of login or registration.

### tool

If your resource is a tool for working with alt:V. Docker falls under this category.

### map

An exterior map that can be loaded into GTA:V.

### mlo

An enterable interior that can be loaded into GTA:V.

## How to post a resource Tutorial

[![Tutorial](https://i.imgur.com/VlAvqSU.jpg)](https://www.youtube.com/watch?v=g2HTRdir6qo)

## Reporting Invalid Github Links

Simply create an issue about the Github link and we'll take care of the rest. Otherwise create a pull request removing the dead link.
