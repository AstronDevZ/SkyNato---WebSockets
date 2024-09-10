from flask import Flask, render_template
from flask_socketio import SocketIO, emit

# Inicializa o app Flask e o SocketIO
app = Flask(__name__)
socketio = SocketIO(app)

# Rota principal que renderiza o template HTML do chat
@app.route('/')
def index():
    return render_template('index.html')

# Evento WebSocket para lidar com mensagens enviadas
@socketio.on('send_message')
def handle_send_message(data):
    username = data['username']
    message = data['message']
    
    # Imprime no servidor e envia para todos os clientes conectados
    print(f'Received message from {username}: {message}')
    emit('receive_message', {'username': username, 'message': message}, broadcast=True)

# Inicia o servidor
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
