self.onnotificationclick = (event) => {
  event.notification.close();
  const { data } = event.notification;

  if (data.setsList.length > 0) {
    const { setsList, breakTime } = data;
    let firstSet = false;

    if (setsList[0].setsNum) {
      firstSet = true;
      const setsListLength = setsList.length;
      for (let i = 0; i < setsListLength; i += 1) {
        const actualSet = setsList.shift();
        for (let j = 0; j < actualSet.setsNum; j += 1) {
          setsList.push(actualSet.exercise);
        }
      }
    }

    const set = setsList.shift();
    const options = {
      vibrate: [100, 50, 100],
      data: { setsList, breakTime },
      actions: [{ action: 'Exercises notification', title: 'Finished' }],
    };
    event.waitUntil(new Promise((resolve) => {
      setTimeout(() => {
        self.registration.showNotification(set, options);
        resolve();
      }, firstSet ? 1 : breakTime * 1000);
    }));
  }
};
