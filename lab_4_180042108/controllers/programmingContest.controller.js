const ProgrammingContest = require('../models/ProgrammingContest.model')
const sendMails = require('../config/mailer');
var crypto = require('crypto');

const getPC=(req,res)=>{
    res.render('programming-contest/register.ejs',{error:req.flash('error')})
    
}

const postPC=(req,res)=>{
    const{teamname,institution,coachname,coachcontact,coachemail,coachtshirt,leadername,leadercontact,leaderemail,leadertshirt,member1name,member1contact,member1email,member1tshirt,member2name,member2contact,member2email,member2tshirt}=req.body
    const total=500
    const paid=0
    const selected=false
    let error = ""
    var verificationCode = crypto.randomBytes(20).toString('hex');

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
                verificationCode,
             })
             participant.save().then(()=>{
                 error = "Team has been registered successfully";
                 console.log('save ', error);
                 let allEmails = [
                   { name: leadername, email: leaderemail },
                   { name: member1name, email: member1email },
                   { name: member2name, email: member2email },
                   { name: coachname, email: coachemail },
                 ];
     
                 allEmails.forEach((person) => {
                   const mailOptions = {
                     from: 'teamupp89@gmail.com',
                     to: person.email,
                     subject: 'Registration on ICT Fest 2021',
                     text: `You ${person.name} and your team ${teamname} has successfully registered for ICT fest programming contest. Keep this code safe: ${verificationCode}`,
                   };
     
                   sendMails(mailOptions);
                 });
     
                req.flash('error',error)
                res.redirect('/ProgrammingContest/register')
             }).catch((err) => {
                 console.log(err);
                error='Unexpected error'
                req.flash('error',error)
                res.redirect('/ProgrammingContest/register')
             })
         }
     })
}

const getPCList=(req,res)=>{
    let all_participant=[]
    let error =""
    ProgrammingContest.find().then((data)=>{
        all_participant=data
        res.render('programming-contest/list.ejs',{
            error:req.flash('error'),
            participants:all_participant,
        })

    }).catch(()=>{
        error='Failed to fetch participants'
        res.render('programming-contest/list.ejs',{
            error:req.flash('error',error),
            participants:all_participant,
        })
    })
}

const deletePC=(req,res)=>{
    let error=''
    const id=req.param.id
    
    ProgrammingContest.deleteOne({_id:req.params.id}).then(()=>{
        error='Data has been deleted successfully!'
            req.flash('error',error)
            res.redirect('/ProgrammingContest/list')

    }).catch(()=>{
        error='Failed to delete data!'
            req.flash('error',error)
            res.redirect('/ProgrammingContest/list')

    })
}

const paymentDonePC=(req,res)=>{
    const id=req.params.id

    ProgrammingContest.findOne({_id:id})
    .then((participant)=>{
        participant.paid=participant.total
        participant.save().then(()=>{
            let error="Payment completed succesfully"
            req.flash('error',error)
            res.redirect('/ProgrammingContest/list')
        })
        .catch(()=>{
            let error="Data could not be updated"
            req.flash('error',error)
            res.redirect("/ProgrammingContest/list")
        })
    })
    .catch(()=>{
        let error="Data could not be updated"
        req.flash('error',error)
        res.redirect("/ProgrammingContest/list")

    })
}

const selectPC=(req,res)=>{
    const id=req.params.id

    ProgrammingContest.findOne({_id:id})
    .then((participant)=>{
        participant.selected=true
        participant.save().then(()=>{
            let error="Team has been selcted succesfully"
            req.flash('error',error)
            res.redirect('/ProgrammingContest/list')
        })
        .catch(()=>{
            let error="Data could not be updated"
            req.flash('error',error)
            res.redirect("/ProgrammingContest/list")
        })
    })
    .catch(()=>{
        let error="Data could not be updated"
        req.flash('error',error)
        res.redirect("/ProgrammingContest/list")

    })
}

const geteditPC=(req,res)=>{
    const id =req.params.id
    let participantInfo=[]
    let error =""
    ProgrammingContest.findOne({_id:id})
    .then((data)=>{
        participantInfo=data
        res.render('programming-contest/edit.ejs',{
            error:req.flash('error'),
            participant:participantInfo,
        })

    }).catch(()=>{
        error='Failed to fetch participants'
        res.render('programming-contest/edit.ejs',{
            error:req.flash('error',error),
            participants:participantInfo,
        })
    })
}

const posteditPC = async (req, res) => {
    const id =req.params.id
    const { teamname, institution, coachname, coachcontact, coachemail, coachtshirt, leadername, leadercontact, leaderemail, leadertshirt,
        member1name, member1contact, member1email, member1tshirt, member2name, member2contact, member2email, member2tshirt } = req.body
  
    ProgrammingContest.findOne({ _id: id }).then( (team) => {
        if (team) {
            team.teamname = teamname;
            team.institution = institution;

            team.coachname = coachname;
            team.coachcontact = coachcontact;
            team.coachemail = coachemail;
            team.coachtshirt = coachtshirt;

            team.leadername = leadername;
            team.leadercontact = leadercontact;
            team.leaderemail = leaderemail;
            team.leadertshirt = leadertshirt;

            team.member1name = member1name;
            team.member1contact = member1contact;
            team.member1email = member1email;
            team.member1tshirt = member1tshirt;

            team.member2name = member2name;
            team.member2contact = member2contact;
            team.member2email = member2email;
            team.member2tshirt = member2tshirt;

            team.save().then(()=>{
                error="Team has been edited successfully!!"
                req.flash('error',error)
                res.redirect("/ProgrammingContest/list")
            }).catch(()=>{
                error="Unexpected Error"
        req.flash('error',error)
        res.redirect("/ProgrammingContest/list")
            });
        }
        else {
            error="Unexpected Error"
        req.flash('error',error)
        res.redirect("/ProgrammingContest/list")
        }
    })
}

module.exports={getPC,postPC,getPCList,deletePC,paymentDonePC,selectPC,geteditPC,posteditPC}