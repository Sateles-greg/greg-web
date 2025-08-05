import asyncio
import websockets
import os

async def log_stream(websocket, path):
    log_file = os.getenv('TRAIN_LOG_FILE', 'train.log')
    last_size = 0
    while True:
        try:
            if os.path.exists(log_file):
                with open(log_file, 'r', encoding='utf-8') as f:
                    f.seek(last_size)
                    lines = f.read()
                    if lines:
                        await websocket.send(lines)
                        last_size = f.tell()
            await asyncio.sleep(1)
        except Exception as e:
            await websocket.send(f"[ERRO] {e}")
            await asyncio.sleep(5)

start_server = websockets.serve(log_stream, '0.0.0.0', 8765)

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(start_server)
    print("WebSocket de logs iniciado na porta 8765")
    asyncio.get_event_loop().run_forever()
