document.addEventListener('DOMContentLoaded', function() {
    const startBattleButton = document.getElementById('start-battle');
    const battleLogMonster1 = document.getElementById('battle-log-monster1');
    const battleLogMonster2 = document.getElementById('battle-log-monster2');
    const healthBarMonster1 = document.getElementById('monster1-health');
    const healthBarMonster2 = document.getElementById('monster2-health');

    const monster1 = {
        name: document.querySelector('.monster-visual:nth-of-type(1) h2').innerText,
        health: parseInt(healthBarMonster1.getAttribute('data-health')),
        maxHealth: parseInt(healthBarMonster1.getAttribute('data-health')),
        attack: parseInt(healthBarMonster1.getAttribute('data-attack')),
        defense: parseInt(healthBarMonster1.getAttribute('data-defense')),
        attackTimer: 250
    };

    const monster2 = {
        name: document.querySelector('.monster-visual:nth-of-type(2) h2').innerText,
        health: parseInt(healthBarMonster2.getAttribute('data-health')),
        maxHealth: parseInt(healthBarMonster2.getAttribute('data-health')),
        attack: parseInt(healthBarMonster2.getAttribute('data-attack')),
        defense: parseInt(healthBarMonster2.getAttribute('data-defense')),
        attackTimer: 250
    };

    startBattleButton.addEventListener('click', startBattle);

    function startBattle() {
        // Clear previous battle logs
        battleLogMonster1.innerHTML = `<h2>${monster1.name} Actions</h2>`;
        battleLogMonster2.innerHTML = `<h2>${monster2.name} Actions</h2>`;

        // Initialize health bars
        updateHealthBar(monster1, healthBarMonster1);
        updateHealthBar(monster2, healthBarMonster2);

        const interval1 = setInterval(() => {
            attack(monster1, monster2, battleLogMonster1, healthBarMonster2);
            if (monster2.health <= 0) {
                clearInterval(interval1);
                clearInterval(interval2);
                battleLogMonster1.innerHTML += `<p>${monster1.name} wins!</p>`;
                battleLogMonster2.innerHTML += `<p>${monster1.name} wins!</p>`;
            }
        }, monster1.attackTimer);

        const interval2 = setInterval(() => {
            attack(monster2, monster1, battleLogMonster2, healthBarMonster1);
            if (monster1.health <= 0) {
                clearInterval(interval1);
                clearInterval(interval2);
                battleLogMonster1.innerHTML += `<p>${monster2.name} wins!</p>`;
                battleLogMonster2.innerHTML += `<p>${monster2.name} wins!</p>`;
            }
        }, monster2.attackTimer);
    }

    function attack(attacker, defender, logElement, healthBar) {
        const damage = Math.max(attacker.attack - defender.defense, 1);
        defender.health -= damage;
        updateHealthBar(defender, healthBar);
        logElement.innerHTML += `<p>${attacker.name} attacks ${defender.name} for ${damage} damage. ${defender.name} health: ${defender.health}</p>`;
    }

    function updateHealthBar(monster, healthBarElement) {
        const healthPercentage = (monster.health / monster.maxHealth) * 100;
        healthBarElement.style.width = healthPercentage + '%';
    }
});
