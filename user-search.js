(()=>{
 const table=document.getElementById('usersTable');if(!table||document.getElementById('userSearch'))return;
 const body=table.querySelector('tbody');
 const label=document.createElement('label');label.htmlFor='userSearch';label.textContent='Buscar usuario o correo permitido';
 const input=document.createElement('input');input.id='userSearch';input.type='search';input.placeholder='Buscar por usuario o correo...';input.setAttribute('aria-label','Buscar usuario o correo permitido');input.style.cssText='width:100%;padding:12px;margin:8px 0;box-sizing:border-box';
 const count=document.createElement('p');count.id='userSearchCount';count.setAttribute('role','status');table.before(label,input,count);
 function filter(){
  const query=input.value.trim().toLocaleLowerCase(),headers=[...table.querySelectorAll('thead th')],emailColumn=headers.findIndex(h=>h.textContent.toLocaleLowerCase().includes('correo'));
  const rows=[...body.children].filter(row=>row.tagName==='TR');let visible=0;
  for(const row of rows){const name=row.children[0]?.textContent.toLocaleLowerCase()||'',emails=emailColumn>=0?(row.children[emailColumn]?.textContent.toLocaleLowerCase()||''):'';const hidden=!(name.includes(query)||emails.includes(query));if(row.hidden!==hidden)row.hidden=hidden;if(!hidden)visible++;}
  const text=query&&visible===0?'No se encontraron coincidencias.':`Mostrando ${visible} de ${rows.length} usuarios.`;if(count.textContent!==text)count.textContent=text;
 }
 input.addEventListener('input',filter);new MutationObserver(filter).observe(body,{childList:true});
 document.getElementById('btnLogout')?.addEventListener('click',()=>{input.value='';filter();});filter();
})();
