document.getElementById('toggle-button').addEventListener('change', function() {
  chrome.storage.sync.get([
    'regularBreaks',
    'mindfulnessReminders',
    'positiveAffirmationReminders',
    'pomodoroTechnique',
    'socialInteractionReminders',
    'healthyHabitReminders'
  ], function(settings) {
    let isAnyReminderEnabled = Object.values(settings).some(setting => setting && setting.enabled);

    let updatedSettings = {};
    for (let key in settings) {
      if (settings[key]) {
        updatedSettings[key] = {
          enabled: !isAnyReminderEnabled,
          frequency: settings[key].frequency
        };
      }
    }

    chrome.storage.sync.set(updatedSettings, function() {
      console.log('Settings updated.');
    });
  });
});

// At the start, fetch current status and set the button checked state accordingly
chrome.storage.sync.get([
  'regularBreaks',
  'mindfulnessReminders',
  'positiveAffirmationReminders',
  'pomodoroTechnique',
  'socialInteractionReminders',
  'healthyHabitReminders'
], function(settings) {
  let isAnyReminderEnabled = Object.values(settings).some(setting => setting && setting.enabled);
  document.getElementById('toggle-button').checked = isAnyReminderEnabled;
});
