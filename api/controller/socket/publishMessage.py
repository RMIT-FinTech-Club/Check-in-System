from socketManager import socketio

def publishMess():
    socketio.emit('message', 'hello world')