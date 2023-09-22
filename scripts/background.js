let regularBreakReminders = [
    {
      title: "Time for a Break!",
      message: "You've been working hard. Take a 5-minute break."
    },
  ];
  
  let mindfulnessReminders = [
    {
      title: "Mindfulness Moment",
      message: "Take a moment to close your eyes and focus on your breath."
    }
  ];
  
  let positiveAffirmationReminders = [
    {
      title: "You're Awesome!",
      message: "Remember, you have the ability to accomplish anything you set your mind to."
    }
  ];
  
  let pomodoroTechniqueReminders = [
    {
        title: "Pomodoro Break",
        message: "Time for a 5-minute break."
    },
    {
        title: "Long Pomodoro Break",
        message: "Time for a 15-minute break."
    }
  ];  

  
  let socialInteractionReminders = [
    {
      title: "Time for Social Interaction",
      message: "Take some time to connect with a friend or loved one."
    }
  ];
  
  let physicalActivityReminders = [
    {
      title: "Let's Get Moving!",
      message: "Take a break for some light exercise. It can boost your mood and energy!"
    }
  ];
  
  let healthyHabitReminders = [
    {
      title: "Healthy Habit Reminder",
      message: "Don't forget to hydrate! Drinking water is crucial for your well-being."
    }
  ];  
  
  
// Function to show reminder
function showReminder(category) {
  let reminders;
  let iconUrl;
  switch(category) {
    case 'regularBreaks':
      reminders = regularBreakReminders;
      iconUrl = 'icons/icon1.png';
      break;
    case 'mindfulnessReminders':
      reminders = mindfulnessReminders;
      iconUrl = 'icons/icon2.png';
      break;
    case 'positiveAffirmationReminders':
      reminders = positiveAffirmationReminders;
      iconUrl = 'icons/icon3.png';
      break;
    case 'pomodoroTechnique':
        if (settings.pomodoroTechnique.sessions % 4 === 0 && settings.pomodoroTechnique.sessions !== 0) {
            reminders = pomodoroTechniqueReminders[1]; // Long break after 4 sessions
        } else {
            reminders = pomodoroTechniqueReminders[0]; // Short break otherwise
        }
        settings.pomodoroTechnique.sessions++;
        chrome.storage.sync.set({pomodoroTechnique: settings.pomodoroTechnique});
        iconUrl = 'icons/icon5.png';
      break;
    case 'socialInteractionReminders':
      reminders = socialInteractionReminders;
      iconUrl = 'icons/icon4.png';
      break;
    case 'healthyHabitReminders':
      reminders = healthyHabitReminders;
      iconUrl = 'icons/icon1.png';
      break;
    default:
      iconUrl = 'icons/icon5.png';
      return;
  }

  const iconPath = chrome.runtime.getURL(iconUrl);

  chrome.storage.local.get([category], function(result) {
    let lastReminderIndex = result[category];
    let nextReminderIndex;

    if (reminders.length > 1) {
      do {
        nextReminderIndex = Math.floor(Math.random() * reminders.length);
      } while (nextReminderIndex === lastReminderIndex);
    } else {
      nextReminderIndex = 0;
    }

    let reminder = reminders[nextReminderIndex];

    let storeObj = {};
    storeObj[category] = nextReminderIndex;
    chrome.storage.local.set(storeObj, function() {
      console.log('Last reminder index saved');
    });

    chrome.notifications.clear(category, function() {
      chrome.notifications.create(category, {
        type: 'basic',
        iconUrl: iconPath,
        title: reminder.title,
        message: reminder.message
      });
    });
    
  });
}
  
  chrome.runtime.onInstalled.addListener(() => {
    
    chrome.storage.sync.get([
      'regularBreaks',
      'mindfulnessReminders',
      'positiveAffirmationReminders',
      'pomodoroTechnique',
      'socialInteractionReminders',
      'healthyHabitReminders'
    ], function(settings) {
      let defaultSettings = {
        regularBreaks: {
          enabled: true,
          frequency: 60
        },
        mindfulnessReminders: {
          enabled: false,
          frequency: 60
        },
        positiveAffirmationReminders: {
          enabled: true,
          frequency: 120
        },
        pomodoroTechnique: {
          enabled: false,
          sessions: 0
        },
        socialInteractionReminders: {
          enabled: false,
          frequency: 60
        },
        healthyHabitReminders: {
          enabled: true,
          frequency: 180
        }
      };
  
      for (let key in defaultSettings) {
        if (!settings[key]) {
          settings[key] = defaultSettings[key];
        }
      }
  
      chrome.storage.sync.set(settings, function() {
        console.log('Default settings saved.');
      });
    });
  });
  

  chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.storage.sync.get(alarm.name, function(settings) {
        if (settings[alarm.name] && settings[alarm.name].enabled) {
            showReminder(alarm.name);
        }
        if (alarm.name === 'pomodoroTechnique' && settings.pomodoroTechnique.enabled) {
            let delay = (settings.pomodoroTechnique.sessions % 4 === 0 && settings.pomodoroTechnique.sessions !== 0) ? 15 : 25;
            chrome.alarms.create('pomodoroTechnique', {delayInMinutes: delay});
        }
    });
});

