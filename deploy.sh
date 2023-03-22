tar -zcvf build.tar .next &&
scp build.tar hetzner:~/convert &&
ssh hetzner 'tar -xf /home/michiel/convert/build.tar -C /home/michiel/convert' &&
ssh hetzner 'rm ~/convert/build.tar' &&
rm build.tar
