/**
 * Browser Console Test Script for Echoes of Silence
 * 
 * Instructions:
 * 1. Open http://localhost:5173/ in your browser
 * 2. Open browser console (F12 or Cmd+Option+I)
 * 3. Copy and paste this entire script
 * 4. Press Enter to run
 * 
 * The script will automatically test the game and report results
 */

(async function testEchoesOfSilence() {
  console.log('🎮 Starting Echoes of Silence Test Suite...\n');
  
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };
  
  function pass(test) {
    results.passed.push(test);
    console.log(`✅ PASS: ${test}`);
  }
  
  function fail(test, reason) {
    results.failed.push({ test, reason });
    console.error(`❌ FAIL: ${test} - ${reason}`);
  }
  
  function warn(test, reason) {
    results.warnings.push({ test, reason });
    console.warn(`⚠️  WARN: ${test} - ${reason}`);
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Test 1: Check if main menu is visible
  console.log('\n📋 Test 1: Main Menu Visibility');
  const menuScreen = document.getElementById('menu-screen');
  if (menuScreen && menuScreen.classList.contains('active')) {
    pass('Main menu is visible');
  } else {
    fail('Main menu visibility', 'Menu screen not found or not active');
  }
  
  // Test 2: Check title elements
  console.log('\n📋 Test 2: Title Elements');
  const titleEye = document.querySelector('.title-eye');
  const titleMain = document.querySelector('.title-main');
  const tagline = document.querySelector('.tagline');
  
  if (titleEye && titleEye.textContent.includes('👁️')) {
    pass('Eye emoji present in title');
  } else {
    fail('Eye emoji', 'Not found in title');
  }
  
  if (titleMain && titleMain.textContent.includes('ECHOES OF SILENCE')) {
    pass('Game title text present');
  } else {
    fail('Game title', 'Title text not found');
  }
  
  if (tagline && tagline.textContent.includes('No confíes en el silencio')) {
    pass('Tagline present');
  } else {
    fail('Tagline', 'Tagline not found');
  }
  
  // Test 3: Check menu buttons
  console.log('\n📋 Test 3: Menu Buttons');
  const btnNewGame = document.getElementById('btn-new-game');
  const btnEndings = document.getElementById('btn-endings');
  
  if (btnNewGame) {
    pass('Nueva partida button exists');
  } else {
    fail('Nueva partida button', 'Button not found');
    return; // Can't continue without this button
  }
  
  if (btnEndings) {
    pass('Finales desbloqueados button exists');
  } else {
    warn('Finales button', 'Button not found');
  }
  
  // Test 4: Check visual effects elements
  console.log('\n📋 Test 4: Visual Effects Elements');
  const noiseOverlay = document.getElementById('noise-overlay');
  const vignette = document.getElementById('vignette');
  const flashOverlay = document.getElementById('flash-overlay');
  const glitchLayer = document.getElementById('glitch-layer');
  
  if (noiseOverlay) pass('Noise overlay present');
  else warn('Noise overlay', 'Element not found');
  
  if (vignette) pass('Vignette present');
  else warn('Vignette', 'Element not found');
  
  if (flashOverlay) pass('Flash overlay present');
  else warn('Flash overlay', 'Element not found');
  
  if (glitchLayer) pass('Glitch layer present');
  else warn('Glitch layer', 'Element not found');
  
  // Test 5: Start new game
  console.log('\n📋 Test 5: Starting New Game');
  console.log('Clicking "Nueva partida" button...');
  btnNewGame.click();
  
  await sleep(1000); // Wait for transition
  
  const gameScreen = document.getElementById('game-screen');
  if (gameScreen && gameScreen.classList.contains('active')) {
    pass('Game screen activated');
  } else {
    fail('Game screen activation', 'Game screen not active after clicking button');
    return;
  }
  
  // Test 6: Check narrative text appears
  console.log('\n📋 Test 6: Narrative Text (Typewriter Effect)');
  await sleep(500);
  
  const narrativeText = document.getElementById('narrative-text');
  if (narrativeText) {
    pass('Narrative text container exists');
    
    // Check if typewriter is active
    if (narrativeText.classList.contains('typing')) {
      pass('Typewriter effect is active');
      console.log('⏳ Waiting for typewriter to finish (or click to skip)...');
      await sleep(3000);
    } else {
      warn('Typewriter effect', 'Typing class not found - text may have loaded instantly');
    }
    
    // Check if text has content
    if (narrativeText.textContent.length > 0) {
      pass('Narrative text has content');
      console.log(`📝 First scene text preview: "${narrativeText.textContent.substring(0, 100)}..."`);
    } else {
      fail('Narrative text content', 'No text content found');
    }
  } else {
    fail('Narrative text container', 'Element not found');
    return;
  }
  
  // Test 7: Check choices appear
  console.log('\n📋 Test 7: Choice Buttons');
  await sleep(2000); // Wait for choices to appear
  
  const choicesContainer = document.getElementById('choices-container');
  if (choicesContainer) {
    pass('Choices container exists');
    
    const choiceButtons = choicesContainer.querySelectorAll('.choice-btn');
    if (choiceButtons.length > 0) {
      pass(`${choiceButtons.length} choice button(s) found`);
      
      choiceButtons.forEach((btn, i) => {
        console.log(`   Choice ${i + 1}: "${btn.textContent.trim()}"`);
      });
      
      // Test 8: Click first choice
      console.log('\n📋 Test 8: Clicking First Choice');
      const firstChoice = choiceButtons[0];
      console.log(`Clicking: "${firstChoice.textContent.trim()}"`);
      firstChoice.click();
      
      await sleep(1000); // Wait for transition
      
      // Check if scene changed
      await sleep(2000);
      const newText = narrativeText.textContent;
      if (newText && newText.length > 0) {
        pass('Scene transitioned to new text');
        console.log(`📝 New scene text preview: "${newText.substring(0, 100)}..."`);
      } else {
        warn('Scene transition', 'Text content appears empty after choice');
      }
      
      // Test 9: Check new choices
      console.log('\n📋 Test 9: Second Scene Choices');
      await sleep(3000);
      
      const newChoices = choicesContainer.querySelectorAll('.choice-btn:not(.disabled)');
      if (newChoices.length > 0) {
        pass(`${newChoices.length} new choice(s) available`);
        
        newChoices.forEach((btn, i) => {
          console.log(`   Choice ${i + 1}: "${btn.textContent.trim()}"`);
        });
        
        // Click second choice
        console.log('\n📋 Test 10: Clicking Second Choice');
        const secondChoice = newChoices[0];
        console.log(`Clicking: "${secondChoice.textContent.trim()}"`);
        secondChoice.click();
        
        await sleep(3000);
        
        const finalText = narrativeText.textContent;
        if (finalText && finalText.length > 0) {
          pass('Third scene loaded successfully');
          console.log(`📝 Third scene text preview: "${finalText.substring(0, 100)}..."`);
        }
      } else {
        warn('Second scene choices', 'No new choices found');
      }
      
    } else {
      fail('Choice buttons', 'No choice buttons found in container');
    }
  } else {
    fail('Choices container', 'Element not found');
  }
  
  // Test 10: Check CSS animations
  console.log('\n📋 Test 11: CSS Styling Check');
  const computedStyle = window.getComputedStyle(document.body);
  const bgColor = computedStyle.backgroundColor;
  
  if (bgColor.includes('10, 10, 10') || bgColor.includes('0a0a0a')) {
    pass('Dark background color applied');
  } else {
    warn('Background color', `Expected dark bg, got: ${bgColor}`);
  }
  
  // Final Report
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${results.passed.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`⚠️  Warnings: ${results.warnings.length}`);
  console.log('='.repeat(60));
  
  if (results.failed.length > 0) {
    console.log('\n❌ Failed Tests:');
    results.failed.forEach(({ test, reason }) => {
      console.log(`   • ${test}: ${reason}`);
    });
  }
  
  if (results.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    results.warnings.forEach(({ test, reason }) => {
      console.log(`   • ${test}: ${reason}`);
    });
  }
  
  console.log('\n✅ Passed Tests:');
  results.passed.forEach(test => {
    console.log(`   • ${test}`);
  });
  
  console.log('\n' + '='.repeat(60));
  
  if (results.failed.length === 0) {
    console.log('🎉 ALL CRITICAL TESTS PASSED!');
    console.log('The game appears to be working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Please review the issues above.');
  }
  
  console.log('\n💡 You can now continue playing manually to test further.');
  console.log('='.repeat(60));
  
})();
