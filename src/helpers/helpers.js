export function showNotification(setter) {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 2000);
}

export function checkWin(correct, wrong, word,time) {
  let status = 'win';
  console.log("time is ",time)
  // Check for win
  word.split('').forEach(letter => {
    if(!correct.includes(letter)){
      status = '';
    }
  });
  
  // Check for lose
  if(wrong.length === 6) status = 'lose';

  if(time === 0) status = 'timeup';

  return status
}