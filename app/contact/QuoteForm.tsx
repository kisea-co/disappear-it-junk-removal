'use client';

import { FormEvent, useState } from 'react';

export default function QuoteForm({reward}:{reward:0|25|50}) {
  const [status,setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [error,setError] = useState('');

  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/quote',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,reward:reward ? String(reward) : ''})});
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'We could not send your request.');
      form.reset();
      setStatus('success');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'We could not send your request.');
      setStatus('error');
    }
  }

  if (status === 'success') return <div role="status" style={{padding:'34px 30px',border:'1px solid #c9b36e',background:'#fff'}}><div className="eyebrow dark">Request Received</div><h2 style={{fontSize:'clamp(2.7rem,5vw,4.3rem)',margin:'10px 0 16px'}}>YOUR QUOTE REQUEST<br/>IS IN.</h2><p style={{margin:0,color:'#5e584f'}}>Thank you! Disappear It will review the details and contact you shortly.</p>{reward > 0 && <p style={{margin:'14px 0 0',fontWeight:600,color:'#70571d'}}>Your ${reward} Trashketball reward was included.</p>}<button className="btn btn-dark" type="button" style={{marginTop:'24px'}} onClick={()=>setStatus('idle')}>Send Another Request</button></div>;

  return <form className="quote-form" onSubmit={submit}>
    <label style={{position:'absolute',left:'-10000px'}} aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
    {reward > 0 && <label className="full">Earned Trashketball reward<input value={`$${reward} off any load size`} readOnly /></label>}
    <label>Name<input name="name" autoComplete="name" required maxLength={100} /></label>
    <label>Phone<input name="phone" type="tel" autoComplete="tel" required maxLength={40} /></label>
    <label>Email<input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
    <label>Location / ZIP<input name="location" autoComplete="postal-code" required maxLength={160} /></label>
    <label className="full">What needs to be removed?<textarea name="junk" required maxLength={2500} /></label>
    <label className="full">Preferred pickup date<input name="date" type="date" /></label>
    <div className="full">
      <button className="btn btn-dark" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending Request…' : 'Submit Quote Request →'}</button>
      <p className="muted" style={{marginBottom:0}}>Your request will be sent directly to Disappear It. We&apos;ll contact you to confirm job details, availability and pricing.</p>
      {status === 'error' && <p role="alert" style={{margin:'12px 0 0',padding:'11px 13px',background:'#f8ded8',borderLeft:'4px solid #9e2f1d',color:'#741f13'}}>{error} You can also call <a href="tel:+14048579200" style={{textDecoration:'underline',fontWeight:600}}>(404) 857-9200</a>.</p>}
    </div>
  </form>;
}
