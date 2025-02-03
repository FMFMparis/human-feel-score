from flask import Flask

app = Flask(__name__)
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Récupérer les données du formulaire
        user_input = request.form['user_input']
        return f'Vous avez saisi : {user_input}'
    return render_template('form.html')

if __name__ == "__main__":
    app.run(debug=True)
