const changeHourInputText = (text, prevValue) => {

  if(text.length > 5) return prevValue;

  if(text.length === 2 && prevValue.length === 1) {
    return `${text}:`;
  }

  if(text.length === 3 && prevValue.length === 2 && !text.includes(':')) {
    const parts = text.split('');
    const newText = [parts[0], parts[1], ':', parts[2]].join('');
    return newText;
  }

  return text;
}

export default changeHourInputText;