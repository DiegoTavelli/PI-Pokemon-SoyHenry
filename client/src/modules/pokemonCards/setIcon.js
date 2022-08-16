

const setIcon = (p) => {
  let index = 0;
  let con;
  if (p.types) {
    con = p.types;
  } else {
    con = p.type
  }

  if (con[0] === "normal" && con[1]) {
    index = 1;
  }

  switch (con[index]?.name || con[index]) {
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