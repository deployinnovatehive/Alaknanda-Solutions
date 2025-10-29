from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/loan')
def loan():
    return render_template('loan.html')

@app.route('/insurance')
def insurance():
    return render_template('Insurance.html')

@app.route('/recruitment')
def recruitment():
    return render_template('recruitment.html')

@app.route('/mice')
def mice():
    return render_template('mice.html')

if __name__ == '__main__':
    app.run(debug=True)
