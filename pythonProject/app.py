from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///monsters.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Monster(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    health = db.Column(db.Integer, nullable=False)
    attack = db.Column(db.Integer, nullable=False)
    defense = db.Column(db.Integer, nullable=False)
    active_ability = db.Column(db.String(100), nullable=False)
    passive_ability = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Monster {self.name}>'


with app.app_context():
    db.drop_all()
    db.create_all()

    monsters = [
        Monster(name='Aqua', health=120, attack=10, defense=5, active_ability='Tsunami', passive_ability='Heal Over Time'),
        Monster(name='Blaze', health=100, attack=15, defense=3, active_ability='Flame Burst', passive_ability='Burn'),
        Monster(name='Flora', health=130, attack=8, defense=7, active_ability='Vine Whip', passive_ability='Regenerate'),
        Monster(name='Spark', health=110, attack=12, defense=4, active_ability='Thunder Strike', passive_ability='Electric Shield'),
        Monster(name='Boulder', health=150, attack=8, defense=10, active_ability='Earthquake', passive_ability='Rock Armor'),
        Monster(name='Zephyr', health=90, attack=14, defense=5, active_ability='Gale Force', passive_ability='Wind Barrier'),
        Monster(name='Frostbite', health=100, attack=10, defense=6, active_ability='Ice Blast', passive_ability='Freeze Aura'),
        Monster(name='Radiant', health=120, attack=11, defense=7, active_ability='Solar Flare', passive_ability='Light Heal'),
        Monster(name='Shadow', health=110, attack=13, defense=5, active_ability='Nightmare', passive_ability='Dark Veil')
    ]

    db.session.bulk_save_objects(monsters)
    db.session.commit()


@app.route('/')
def index():
    monsters = Monster.query.all()
    return render_template('index.html', monsters=monsters)


@app.route('/create_monster', methods=['GET', 'POST'])
def create_monster():
    if request.method == 'POST':
        name = request.form['name']
        health = request.form['health']
        attack = request.form['attack']
        defense = request.form['defense']
        active_ability = request.form['active_ability']
        passive_ability = request.form['passive_ability']

        new_monster = Monster(
            name=name,
            health=health,
            attack=attack,
            defense=defense,
            active_ability=active_ability,
            passive_ability=passive_ability
        )

        db.session.add(new_monster)
        db.session.commit()

        return redirect(url_for('index'))

    return render_template('create_monster.html')


@app.route('/choose_monsters', methods=['GET', 'POST'])
def choose_monsters():
    monsters = Monster.query.all()
    if request.method == 'POST':
        monster1_id = request.form['monster1']
        monster2_id = request.form['monster2']
        return redirect(url_for('battle', monster1_id=monster1_id, monster2_id=monster2_id))

    return render_template('choose_monsters.html', monsters=monsters)


@app.route('/battle/<int:monster1_id>/<int:monster2_id>')
def battle(monster1_id, monster2_id):
    monster1 = Monster.query.get_or_404(monster1_id)
    monster2 = Monster.query.get_or_404(monster2_id)
    return render_template('battle.html', monster1=monster1, monster2=monster2)


if __name__ == '__main__':
    app.run(debug=True)
