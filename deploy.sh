tar -zcvf build.tar .next &&
scp build.tar hetzner:~/convert &&
ssh hetzner 'cd ~/convert && git pull' &&
ssh hetzner 'tar -xf /home/michiel/convert/build.tar -C /home/michiel/convert' &&
ssh hetzner 'rm ~/convert/build.tar' &&
ssh hetzner 'cd ~/convert && docker-compose build' &&
ssh hetzner 'cd ~/convert && docker-compose up --build -d'
rm build.tar
