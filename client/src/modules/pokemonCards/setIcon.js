

const setIcon = (p) => {
  let index = 0;
  if (p.types) {
    if (p.types[0] === "normal" && p.types[1]) {
      index = 1;
    }
    switch (p.types[index].name) {
      case "normal":
        return "🔰";
      case "fighting":
        return "🥊";
      case "flying":
        return "🐦";
      case "poison":
        return "💀";
      case "ground":
        return "🐾";
      case "ghost":
        return "👻";
      case "fire":
        return "🔥";
      case "rock":
        return "🗻";
      case "steel":
        return "🦾";
      case "bug":
        return "🐛";
      case "water":
        return "🌊";
      case "grass":
        return "💚";
      case "electric":
        return "⚡";
      case "psychic":
        return "🧠";
      case "ice":
        return "🧊";
      case "dragon":
        return "🐲";
      case "fairy":
        return "🧚🏾‍♀️";
      case "dark":
        return "🖤";
      case "shadow":
        return "👥";
      case "unknown":
        return "❓";
      case undefined:
        return "💨"

      default:
        return "🔰";
    }
  }
  if (p.type[0] === "normal" && p.type[1]) {
    index = 1;
  }
  switch (p.type[index]) {
    case "normal":
      return "🔰";
    case "fighting":
      return "🥊";
    case "flying":
      return "🐦";
    case "poison":
      return "💀";
    case "ground":
      return "🐾";
    case "ghost":
      return "👻";
    case "fire":
      return "🔥";
    case "rock":
      return "🗻";
    case "steel":
      return "🦾";
    case "bug":
      return "🐛";
    case "water":
      return "🌊";
    case "grass":
      return "💚";
    case "electric":
      return "⚡";
    case "psychic":
      return "🧠";
    case "ice":
      return "🧊";
    case "dragon":
      return "🐲";
    case "fairy":
      return "🧚🏾‍♀️";
    case "dark":
      return "🖤";
    case "shadow":
      return "👥";
    case "unknown":
      return "❓";
    case undefined:
      return "💨"

    default:
      return "🔰";
  }
}

export default setIcon;