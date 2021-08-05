const ProgrammingContest = require('../models/ProgrammingContest.model')

const getPC=(req,res)=>{
    res.render('programming-contest/register.ejs',{error:req.flash('error')})
    
}

const postPC=(req,res)=>{
    const{teamname,institution,coachname,coachcontact,coachemail,coachtshirt,leadername,leadercontact,leaderemail,leadertshirt,member1name,member1contact,member1email,member1tshirt,member2name,member2contact,member2email,member2tshirt}=req.body
    

    const total=500
     const paid=0
     const selected=false
     let error=""

     ProgrammingContest.findOne({teamname:teamname,coachname:coachname}).then((participant)=>{
         if(participant){
             error="Team with same team name and coach name exists"
             
             req.flash('error',error)
             res.redirect('/ProgrammingContest/register')
         }else{
             const participant=new ProgrammingContest({
                teamname,
                institution,
                coachname,
                coachcontact,
                coachemail,
                coachtshirt,
                leadername,
                leadercontact,
                leaderemail,
                leadertshirt,
                member1name,
                member1contact,
                member1email,
                member1tshirt,
                member2name,
                member2contact,
                member2email,
                member2tshirt,
                paid,
                total,
                selected,
             })
             participant.save().then(()=>{
                error="Team has been registered successfully"
                req.flash('error',error)
                res.redirect('/ProgrammingContest/register')
             }).catch(()=>{
                error='Unexpected error'
                req.flash('error',error)
                res.redirect('/ProgrammingContest/register')


             })
         }
     })
  
}