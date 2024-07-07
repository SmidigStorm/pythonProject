document.addEventListener('DOMContentLoaded', function() {
    const startBattleButton = document.getElementById('start-battle');
    const battleLogMonster1 = document.getElementById('battle-log-monster1');
    const battleLogMonster2 = document.getElementById('battle-log-monster2');
    const healthBarMonster1 = document.getElementById('monster1-health');
    const healthBarMonster2 = document.getElementById('monster2-health');
    const cooldownBarMonster1 = document.getElementById('monster1-cooldown');
    const cooldownBarMonster2 = document.getElementById('monster2-cooldown');

    const monster1 = {
        name: document.querySelector('.monster-visual:nth-of-type(1) h2').innerText,
        health: parseInt(healthBarMonster1.getAttribute('data-health')),
        maxHealth: parseInt(healthBarMonster1.getAttribute('data-health')),
        attack: parseInt(healthBarMonster1.getAttribute('data-attack')),
        defense: parseInt(healthBarMonster1.getAttribute('data-defense')),
        attackTimer: 500 // 0.5 seconds
    };

    const monster2 = {
        name: document.querySelector('.monster-visual:nth-of-type(2) h2').innerText,
        health: parseInt(healthBarMonster2.getAttribute('data-health')),
        maxHealth: parseInt(healthBarMonster2.getAttribute('data-health')),
        attack: parseInt(healthBarMonster2.getAttribute('data-attack')),
        defense: parseInt(healthBarMonster2.getAttribute('data-defense')),
        attackTimer: 500 // 0.5 seconds
    };

    startBattleButton.addEventListener('click', startBattle);

    function startBattle() {
        // Clear previous battle logs
        battleLogMonster1.innerHTML = `<h2>${monster1.name} Actions</h2>`;
        battleLogMonster2.innerHTML = `<h2>${monster2.name} Actions</h2>`;

        // Initialize health and cooldown bars
        updateHealthBar(monster1, healthBarMonster1);
        updateHealthBar(monster2, healthBarMonster2);
        startCooldown(monster1, cooldownBarMonster1);
        startCooldown(monster2, cooldownBarMonster2);

        const interval1 = setInterval(() => {
            attack(monster1, monster2, battleLogMonster1, healthBarMonster2);
            startCooldown(monster1, cooldownBarMonster1);
            if (monster2.health <= 0) {
                clearInterval(interval1);
                clearInterval(interval2);
                battleLogMonster1.innerHTML += `<p>${monster1.name} wins!</p>`;
                battleLogMonster2.innerHTML += `<p>${monster1.name} wins!</p>`;
            }
        }, monster1.attackTimer);

        const interval2 = setInterval(() => {
            attack(monster2, monster1, battleLogMonster2, healthBarMonster1);
            startCooldown(monster2, cooldownBarMonster2);
            if (monster1.health <= 0) {
                clearInterval(interval1);
                clearInterval(interval2);
                battleLogMonster1.innerHTML += `<p>${monster2.name} wins!</p>`;
                battleLogMonster2.innerHTML += `<p>${monster2.name} wins!</p>`;
            }
        }, monster2.attackTimer);
    }

    function attack(attacker, defender, logElement, healthBar) {
        let damage = Math.max(attacker.attack - defender.defense, 1); // Ensure minimum damage of 1
        defender.health -= damage;
        updateHealthBar(defender, healthBar);
        const logEntry = `<p>${attacker.name} attacks ${defender.name} for ${damage} damage. ${defender.name} health: ${defender.health}</p>`;
        logElement.innerHTML = logEntry + logElement.innerHTML; // Prepend the new entry
    }

    function updateHealthBar(monster, healthBarElement) {
        const healthPercentage = (monster.health / monster.maxHealth) * 100;
        healthBarElement.style.width = healthPercentage + '%';
    }

    function startCooldown(monster, cooldownBarElement) {
        let width = 0;
        const interval = setInterval(() => {
            width += 100 / (monster.attackTimer / 50); // update every 50ms
            cooldownBarElement.style.width = width + '%';
            if (width >= 100) {
                clearInterval(interval);
            }
        }, 50);
    }
});
