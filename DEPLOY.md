# Deploying akaamil.com (Ubuntu + Nginx, via git)

The site is a static folder served by Nginx. Deploys are `git pull` + nothing else
(no build step). Repo: `https://github.com/abdullahkaamil/protfolio.git`

## 0. DNS (once)
Point the domain at your server's public IP:
```
A     akaamil.com       -> <SERVER_IP>
A     www.akaamil.com   -> <SERVER_IP>
```
Wait for it to resolve (`dig +short akaamil.com`) before requesting SSL.

## 1. Install Nginx + git (once)
```bash
sudo apt update
sudo apt install -y nginx git
```

## 2. Clone the repo into the web root (once)
```bash
sudo mkdir -p /var/www
sudo git clone https://github.com/abdullahkaamil/protfolio.git /var/www/akaamil
# let your user own it so future pulls don't need sudo
sudo chown -R $USER:www-data /var/www/akaamil
```

## 3. Install the Nginx site config (once)
```bash
sudo cp /var/www/akaamil/deploy/nginx.conf /etc/nginx/sites-available/akaamil.com
sudo ln -s /etc/nginx/sites-available/akaamil.com /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default   # optional: drop the welcome page
sudo nginx -t                                 # test config
sudo systemctl reload nginx
```
Visit `http://akaamil.com` — it should load over HTTP now.

## 4. Enable HTTPS with Let's Encrypt (once)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d akaamil.com -d www.akaamil.com
```
Certbot edits the Nginx config to add the `443`/SSL block and sets up auto-renewal.
Choose "redirect HTTP to HTTPS" when prompted.

## 5. Deploying updates (every time)
```bash
cd /var/www/akaamil
git pull
```
That's it — static files, so no restart needed. (If you ever change caching headers in
`deploy/nginx.conf`, re-copy it to `sites-available` and `sudo systemctl reload nginx`.)

### Optional: one-liner update alias
Add to `~/.bashrc` on the server:
```bash
alias deploy-akaamil='cd /var/www/akaamil && git pull'
```

## Notes
- The Nginx config blocks `.git`, `.claude`, and other dotfiles from being served.
- The contact form still needs a Formspree ID (see `README.md`) to deliver messages;
  until then it opens the visitor's mail client.
