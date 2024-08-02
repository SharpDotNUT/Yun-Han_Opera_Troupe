
import { exec } from 'child_process';

const command = 'git -C . rev-list --count master'

exec(command, (error, stdout, stderr) => {
  console.log(stdout.trim())
})