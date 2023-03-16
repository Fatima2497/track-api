
const express = require('express')
const auth = require('../../middleware/auth')
const route = express()
const Excer = require('../../models/exercise')

//create activity
route.post('/add',auth,async(req,res)=>{
  
    const userId = req.user.id
    const {name, description, activity_type, duration, date} = req.body

    try {
      const result = await Excer.create({name,description,activity_type,duration,date,userId})
      res.send('added')
    } catch (e) {
      res.send(e.message)
    }
  
})

//get all activity by id of specific user
route.get('/', auth, async (req, res) => {
	try {
    const Id = req.user.id
		const activitys = await Excer.find({userId: Id}).sort({ date: -1 })
		res.json(activitys);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});


//get  activity 
route.get('/:id', auth, async (req, res) => {
	try {
    let getId = req.user.id
		const activityGet = await Excer.findOne({ _id: req.params.id, userId: getId });

		if (!activityGet) {
			return res.status(400).json({ msg: 'Activity not found' });
		}

		res.json(activityGet);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// update activity
route.put('/:id', 
	auth
, async (req, res) => {
	try {
    let usersId = req.user.id
		const activity = await Excer.findOne({ _id: req.params.id, userId: usersId });

		if (!activity) {
			return res.status(400).json({ msg: 'activity not found' });
		}

		const { name, description, duration, activity_type, date } = req.body;

		activity.name = name ? name : activity.name;
		activity.description = description ? description : activity.description;
		activity.duration = duration ? duration : activity.duration;
		activity.activity_type = activity_type ? activity_type : activity.activity_type;
		activity.date = date ? date : activity.date;

		await activity.save();

		res.json({ msg: 'activity updated' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// delete activity
route.delete('/:id', auth, async (req, res) => {

	try {
    let id = req.params.id
		console.log(id)
		const activityDelet = await Excer.findByIdAndDelete(id);

		if (!activityDelet) {
			return res.status(400).json({ msg: 'Activity not found' });
		}

		res.json({ msg: 'Activity removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = route