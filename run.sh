# Launch script for AWS environment

nohup PORT=80 npm start &

echo $! > nohup.pid
