from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///monsters.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db = SQLAlchemy(app)


# Define the Monster model
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


# Create the database tables
with app.app_context():
    db.create_all()


@app.route('/')
def index():
    monsters = Monster.query.all()
    return render_template('index.html', monsters=monsters)

@app.route('/battle')
def battle():
    return render_template('battle.html')

@app.route('/create_monster', methods=['GET', 'POST'])
def create_monster():
    if request.method == 'POST':
        name = request.form['name']
        health = request.form['health']
        attack = request.form['attack']
        defense = request.form['defense']
        active_ability = request.form['active_ability']
        passive_ability = request.form['passive_ability']

        # Create a new monster
        new_monster = Monster(
            name=name,
            health=health,
            attack=attack,
            defense=defense,
            active_ability=active_ability,
            passive_ability=passive_ability
        )

        # Add the monster to the database
        db.session.add(new_monster)
        db.session.commit()

        return redirect(url_for('index'))

    return render_template('create_monster.html')


if __name__ == '__main__':
    app.run(debug=True)
