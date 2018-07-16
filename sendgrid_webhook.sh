function localtunnel {
  lt -s shaoqianghu2369 --port 5000
}
until localtunnel; do
  echo "localtunnel server crashed"
  sleep 2
done
