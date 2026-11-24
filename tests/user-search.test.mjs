import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {parseHTML} from 'linkedom';
const tick=()=>new Promise(setImmediate);
test('User/email search keeps actions and permissions, ignores passwords and retains filter after render',async()=>{
 const html=await readFile(new URL('../admin.html',import.meta.url),'utf8'),{window}=parseHTML(html),context=vm.createContext(window);
 vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],context);
 vm.runInContext(await readFile(new URL('../user-permissions.js',import.meta.url),'utf8'),context);
 vm.runInContext(await readFile(new URL('../user-search.js',import.meta.url),'utf8'),context);
 const users=[{username:'Alice',password:'private-password',expiresAt:'2099-01-01',emails:['a@example.org']},{username:'Bob',password:'private-password',expiresAt:'2099-01-01',emails:['b@example.org']}];window.renderUsers(users);await tick();
 const input=window.document.getElementById('userSearch'),rows=[...window.document.querySelectorAll('#usersTable tbody tr')],details=rows[0].querySelector('details'),button=rows[0].querySelector('button');
 function search(q){input.value=q;input.dispatchEvent(new window.Event('input'));}
 search('ALI');assert.equal(rows[0].hidden,false);assert.equal(rows[1].hidden,true);assert.equal(rows[0].querySelector('details'),details);assert.equal(rows[0].querySelector('button'),button);
 search('private-password');assert.ok(rows.every(r=>r.hidden));
 if([...window.document.querySelectorAll('#usersTable th')].some(h=>h.textContent.includes('Correo'))){search('B@EXAMPLE');assert.equal(rows[0].hidden,true);assert.equal(rows[1].hidden,false);}
 search('bob');window.renderUsers([...users,{username:'Bobby',password:'p',expiresAt:'2099-01-01',emails:[]}]);await tick();assert.equal(window.document.querySelectorAll('#usersTable tbody tr:not([hidden])').length,2);
 search('');assert.equal(window.document.querySelectorAll('#usersTable tbody tr:not([hidden])').length,3);assert.equal(window.document.querySelectorAll('#userSearch').length,1);
});
