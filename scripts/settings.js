function setAlarms(settings) {
    for (let key in settings) {
      chrome.alarms.clear(key);
      if (settings[key].enabled) {
        chrome.alarms.create(key, { delayInMinutes: settings[key].frequency, periodInMinutes: settings[key].frequency });
      }
    }
  }
  
  document.getElementById('settings-form').addEventListener('submit', function(event) {
      event.preventDefault();
  
      let regularBreaksEnabled = document.getElementById('regularBreaksEnabled').checked;
      let regularBreaksFrequency = parseInt(document.getElementById('regularBreaksFrequency').value);
  
      let mindfulnessRemindersEnabled = document.getElementById('mindfulnessRemindersEnabled').checked;
      let mindfulnessRemindersFrequency = parseInt(document.getElementById('mindfulnessRemindersFrequency').value);
  
      let positiveAffirmationRemindersEnabled = document.getElementById('positiveAffirmationRemindersEnabled').checked;
      let positiveAffirmationRemindersFrequency = parseInt(document.getElementById('positiveAffirmationRemindersFrequency').value);
  
      let pomodoroTechniqueEnabled = document.getElementById('pomodoroTechniqueEnabled').checked;
  
      let socialInteractionRemindersEnabled = document.getElementById('socialInteractionRemindersEnabled').checked;
      let socialInteractionRemindersFrequency = parseInt(document.getElementById('socialInteractionRemindersFrequency').value);
  
      let healthyHabitRemindersEnabled = document.getElementById('healthyHabitRemindersEnabled').checked;
      let healthyHabitRemindersFrequency = parseInt(document.getElementById('healthyHabitRemindersFrequency').value);
  
  
      // Store the settings
      chrome.storage.sync.set({
          regularBreaks: {
              enabled: regularBreaksEnabled,
              frequency: regularBreaksFrequency
          },
          mindfulnessReminders: {
              enabled: mindfulnessRemindersEnabled,
              frequency: mindfulnessRemindersFrequency
          },
          positiveAffirmationReminders: {
              enabled: positiveAffirmationRemindersEnabled,
              frequency: positiveAffirmationRemindersFrequency
          },
          pomodoroTechnique: {
            enabled: pomodoroTechniqueEnabled,
            sessions: 0
          },        
          socialInteractionReminders: {
              enabled: socialInteractionRemindersEnabled,
              frequency: socialInteractionRemindersFrequency
          },
          healthyHabitReminders: {
              enabled: healthyHabitRemindersEnabled,
              frequency: healthyHabitRemindersFrequency
          },
  
      }, function() {
          console.log('Settings saved.');

          // Show success message
          let saveSuccess = document.getElementById('save-success');
          saveSuccess.style.display = 'block';

          setTimeout(function() {
              saveSuccess.style.display = 'none';
          }, 3000);

          // Get the settings again and create the alarms
          chrome.storage.sync.get([
            'regularBreaks',
            'mindfulnessReminders',
            'positiveAffirmationReminders',
            'resourceSharingReminders',
            'socialInteractionReminders',
            'healthyHabitReminders'
          ], function(settings) {
            setAlarms(settings);
          });
      });
  });
  // Load and display saved settings when the page loads
  document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get([
      'regularBreaks',
      'mindfulnessReminders',
      'positiveAffirmationReminders',
      'pomodoroTechnique',
      'socialInteractionReminders',
      'healthyHabitReminders'
    ], function(settings) {
      document.getElementById('regularBreaksEnabled').checked = settings.regularBreaks.enabled;
      document.getElementById('regularBreaksFrequency').value = settings.regularBreaks.frequency;
      document.getElementById('mindfulnessRemindersEnabled').checked = settings.mindfulnessReminders.enabled;
      document.getElementById('mindfulnessRemindersFrequency').value = settings.mindfulnessReminders.frequency;
      document.getElementById('positiveAffirmationRemindersEnabled').checked = settings.positiveAffirmationReminders.enabled;
      document.getElementById('positiveAffirmationRemindersFrequency').value = settings.positiveAffirmationReminders.frequency;
      document.getElementById('pomodoroTechniqueEnabled').checked = settings.pomodoroTechnique.enabled;
      document.getElementById('socialInteractionRemindersEnabled').checked = settings.socialInteractionReminders.enabled;
      document.getElementById('socialInteractionRemindersFrequency').value = settings.socialInteractionReminders.frequency;
      document.getElementById('healthyHabitRemindersEnabled').checked = settings.healthyHabitReminders.enabled;
      document.getElementById('healthyHabitRemindersFrequency').value = settings.healthyHabitReminders.frequency;
    });
  });


    // When settings are saved...
    document.getElementById('save-success').style.display = 'block';

    // Hide the message after 3 seconds
    setTimeout(function() {
        document.getElementById('save-success').style.display = 'none';
    }, 3000);

    
//Accordion for FAQ

var acc = document.getElementsByClassName("accordion-toggle");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        } 
    });
}

// Trigger click on the first accordion item to keep it open by default
if(acc.length > 0) {
    acc[0].click();
}







  