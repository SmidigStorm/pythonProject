document.addEventListener('DOMContentLoaded', function() {
    const startBattleButton = document.getElementById('start-battle');
    const battleLogMonster1 = document.getElementById('battle-log-monster1');
    const battleLogMonster2 = document.getElementById('battle-log-monster2');
    const healthBarMonster1 = document.getElementById('monster1-health');
    const healthBarMonster2 = document.getElementById('monster2-health');

    startBattleButton.addEventListener('click', startBattle);

    function startBattle() {
        // Mock data for two monsters, this would be replaced by real data from your server
        const monster1 = {
            name: 'Monster 1',
            health: 100,
            maxHealth: 100,
            attack: 15,
            defense: 5,
            attackTimer: 1000 // 1 second
        };

        const monster2 = {
            name: 'Monster 2',
            health: 120,
            maxHealth: 120,
            attack: 10,
            defense: 3,
            attackTimer: 1000 // 1 second
        };

        // Clear previous battle logs
        battleLogMonster1.innerHTML = '<h2>Monster 1 Actions</h2>';
        battleLogMonster2.innerHTML = '<h2>Monster 2 Actions</h2>';

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
        const damage = Math.max(attacker.attack - defender.defense, 0);
        defender.health -= damage;
        updateHealthBar(defender, healthBar);
        logElement.innerHTML += `<p>${attacker.name} attacks ${defender.name} for ${damage} damage. ${defender.name} health: ${defender.health}</p>`;
    }

    function updateHealthBar(monster, healthBarElement) {
        const healthPercentage = (monster.health / monster.maxHealth) * 100;
        healthBarElement.style.width = healthPercentage + '%';
    }
});
