const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const cors = require('cors');
const axios = require('axios');
// >>> Model's Imports
const User = require('./models/userModel');
const DayTourActivity = require('./models/dayTourActivityModel');
const Accomodation = require('./models/accomodationModel');
const Event = require('./models/eventModel');
const Ticket = require('./models/ticketModel');
const Visa = require('./models/visaModel');
const Rental = require('./models/rentalModel');
const Meal = require('./models/mealModel');
const Transfer = require('./models/transferModel');
const Attraction = require('./models/attractionModel');
const Group = require('./models/groupModel');
// >>> Settings Imports
const AgeRange = require('./models/ageRangeModel');
const CancellationPolicy = require('./models/cancellationPolicyModel');
const Inclusion = require('./models/inclusionModel');
const Exclusion = require('./models/exclusionModel');
const Category = require('./models/categoryModel');
const Theme = require('./models/themeModel');
const Language = require('./models/languageModel');
const WhatToBring = require('./models/whatToBringModel');
const PackageTour = require('./models/packageTourModel');
const Product = require('./models/productModel');
const Classe = require('./models/classeModel');
const Location = require('./models/locationModel');
const PickupPlace = require('./models/pickupPlaceModel');
const DropoffPlace = require('./models/dropoffPlaceModel');
const bcrypt = require('bcrypt'); // Importe o bcrypt
const jwt = require('jsonwebtoken');
const { startOfDay, endOfDay, isEqual } = require('date-fns');

const app = express()


// >>> Server's Configs
const corsOptions = {
    //origin: 'http://192.168.1.193', // Substitua pela URL do seu aplicativo React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type,Authorization',
  };
  
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json())
  app.use(express.urlencoded({extended: false}))

//routes

// >>> Login's Endpoints
app.get('/api_/users', async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/users', async(req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verifique se o usuário existe no banco de dados
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
  
      // Verifique se a senha está correta
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
  
      // Gere um token JWT
      const token = jwt.sign({ email: user.email, role: user.role }, 'secretpassword', { expiresIn: '1h' });
  
      // Retorne todos os dados do usuário no response
      res.status(200).json({ 
        token,
        user: {
          email: user.email,
          role: user.role,
          region: user.region,
          name: user.name,
          lastName: user.lastName,
          profileImage: user.profileImage
          // Adicione outros campos conforme necessário
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });
  
  // ... (outros endpoints existentes)

  
  // Exemplo de middleware para verificar o token
  function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
  
    if (!token) return res.status(401).json({ message: 'Token não fornecido' });
  
    jwt.verify(token, 'secretpassword', (err, user) => {
      if (err) return res.status(403).json({ message: 'Token inválido' });
  
      req.user = user;
      next();
    });
  }
  
// >>> Products / Expiriences --


// >>> Day-Tour-Activity's Endpoints
app.get('/api_/day-tour-activity', async(req, res) => {
    try {
        const dayTourActivitys = await DayTourActivity.find({});
        res.status(200).json(dayTourActivitys);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/day-tour-activity', async(req, res) => {
    try {
        const dayTourActivity = await DayTourActivity.create(req.body)
        res.status(200).json(dayTourActivity);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/api_/day-tour-activity/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const dayTourActivity = await DayTourActivity.findByIdAndUpdate(id, req.body);
        if(!dayTourActivity){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedDayTourActivity = await DayTourActivity.findById(id);
        res.status(200).json(updatedDayTourActivity);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.delete('/api_/day-tour-activity/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const dayTourActivity = await DayTourActivity.findByIdAndDelete(id);
        if(!dayTourActivity){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(dayTourActivity);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// >>> Accomodation's Endpoints

app.get('/api_/accomodations', async(req, res) => {
    try {
        const accomodation = await Accomodation.find({});
        res.status(200).json(accomodation);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/accomodations', async(req, res) => {
    try {
        const accomodation = await Accomodation.create(req.body)
        res.status(200).json(accomodation);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/api_/accomodations/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const accomodation = await Accomodation.findByIdAndUpdate(id, req.body);
        if(!accomodation){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedAccomodation = await Accomodation.findById(id);
        res.status(200).json(updatedAccomodation);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/api_/accomodations/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const accomodation = await Accomodation.findByIdAndDelete(id);
        if(!accomodation){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(accomodation);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// >>> Meals's Endpoints

app.get('/api_/meals', async(req, res) => {
    try {
        const meal = await Meal.find({});
        res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/meals', async(req, res) => {
    try {
        const meal = await Meal.create(req.body)
        res.status(200).json(meal);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.delete('/api_/meals/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const meal = await Meal.findByIdAndDelete(id);
        if(!meal){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(meal);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// >>> Event's Endpoints

app.get('/api_/events', async(req, res) => {
    try {
        const event = await Event.find({});
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/events', async(req, res) => {
    try {
        const event = await Event.create(req.body)
        res.status(200).json(event);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.delete('/api_/events/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const event = await Event.findByIdAndDelete(id);
        if(!event){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(event);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// >>> Ticket's Endpoints

app.get('/api_/tickets', async(req, res) => {
    try {
        const ticket = await Ticket.find({});
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/tickets', async(req, res) => {
    try {
        const ticket = await Ticket.create(req.body)
        res.status(200).json(ticket);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.delete('/api_/tickets/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const ticket = await Ticket.findByIdAndDelete(id);
        if(!meal){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(ticket);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// >>> Attraction's Endpoints

app.get('/api_/attractions', async(req, res) => {
    try {
        const attraction = await Attraction.find({});
        res.status(200).json(attraction);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/api_/attractions/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const attraction = await Attraction.findByIdAndDelete(id);
        if(!attraction){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(attraction);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/attractions', async(req, res) => {
    try {
        const attraction = await Attraction.create(req.body)
        res.status(200).json(attraction);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// >>> Transportation's Endpoints

app.get('/api_/transfers', async(req, res) => {
    try {
        const transfer = await Transfer.find({});
        res.status(200).json(transfer);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/transfers', async(req, res) => {
    try {
        const transfer = await Transfer.create(req.body)
        res.status(200).json(transfer);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.delete('/api_/transfers/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const transfer = await Transfer.findByIdAndDelete(id);
        if(!transfer){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(transfer);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// >>> Rental's Endpoints

app.get('/api_/rentals', async(req, res) => {
    try {
        const rental = await Rental.find({});
        res.status(200).json(rental);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/rentals', async(req, res) => {
    try {
        const rental = await Rental.create(req.body)
        res.status(200).json(rental);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.delete('/api_/rentals/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const rental = await Rental.findByIdAndDelete(id);
        if(!rental){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(rental);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// >>> Visa's Endpoints

app.get('/api_/visas', async(req, res) => {
    try {
        const visa = await Visa.find({});
        res.status(200).json(visa);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/visas', async(req, res) => {
    try {
        const visa = await Visa.create(req.body)
        res.status(200).json(visa);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


app.delete('/api_/visas/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const visa = await Visa.findByIdAndDelete(id);
        if(!visa){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(visa);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// >>> Settings / Proudcts features



// >>> Cancellation Policy's Endpoints

app.get('/api_/cancellation-policy', async(req, res) => {
    try {
        const cancellationPolicy = await CancellationPolicy.find({});
        res.status(200).json(cancellationPolicy);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/cancellation-policy', async(req, res) => {
    try {
        const cancellationPolicy = await CancellationPolicy.create(req.body)
        res.status(200).json(cancellationPolicy);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/api_/cancellation-policy/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const cancellationPolicy = await CancellationPolicy.findByIdAndUpdate(id, req.body);
        if(!cancellationPolicy){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedCancellationPolicy = await CancellationPolicy.findById(id);
        res.status(200).json(updatedCancellationPolicy);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/api_/cancellation-policy/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cancellationPolicy = await CancellationPolicy.findByIdAndDelete(id);
        if (!cancellationPolicy) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        res.status(200).json(cancellationPolicy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// >>> Pickup - Places

app.get('/api_/pickup-places', async (req, res) => {
    try {
        const pickupPlaces = await PickupPlace.find({});
        res.status(200).json(pickupPlaces);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api_/pickup-places', async (req, res) => {
    try {
        const pickupPlace = await PickupPlace.create(req.body);
        res.status(200).json(pickupPlace);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.put('/api_/pickup-places/:id', async (req, res) => {
    try {
        const pickupPlaceId = req.params.id;
        const updatedPickupPlace = await PickupPlace.findByIdAndUpdate(pickupPlaceId, req.body, { new: true });

        if (!updatedPickupPlace) {
            return res.status(404).json({ message: 'Local de retirada não encontrado' });
        }

        res.status(200).json(updatedPickupPlace);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api_/pickup-places/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pickupPlace = await PickupPlace.findByIdAndDelete(id);
        if (!pickupPlace) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        res.status(200).json(pickupPlace);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// >>> Pickup - Extends

// >>> DropOff - Places

app.get('/api_/dropoff-places', async (req, res) => {
    try {
        const dropoffPlaces = await DropoffPlace.find({});
        res.status(200).json(dropoffPlaces);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api_/dropoff-places', async (req, res) => {
    try {
        const dropoffPlace = await DropoffPlace.create(req.body);
        res.status(200).json(dropoffPlace);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.put('/api_/dropoff-places/:id', async (req, res) => {
    try {
        const dropoffPlaceId = req.params.id;
        const updatedDropoffPlace = await DropoffPlace.findByIdAndUpdate(dropoffPlaceId, req.body, { new: true });

        if (!updatedDropoffPlace) {
            return res.status(404).json({ message: 'Local de entrega não encontrado' });
        }

        res.status(200).json(updatedDropoffPlace);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api_/dropoff-places/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dropoffPlace = await DropoffPlace.findByIdAndDelete(id);
        if (!dropoffPlace) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        res.status(200).json(dropoffPlace);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// >>> Dropoff - Extends


// >>> Categorie's Endpoints

app.get('/api_/categories', async(req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/categories', async(req, res) => {
    try {
        const category = await Category.create(req.body)
        res.status(200).json(category);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/api_/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


app.delete('/api_/categories/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const category = await Category.findByIdAndDelete(id);
        if(!category){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(category);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// >>> Location's Endpoints cancell

app.get('/api_/locations', async(req, res) => {
    try {
        const location = await Location.find({});
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/locations', async(req, res) => {
    try {
        const location = await Location.create(req.body)
        res.status(200).json(location);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/api_/locations/:id', async (req, res) => {
    try {
        const locationId = req.params.id;
        const updatedLocation = await Location.findByIdAndUpdate(locationId, req.body, { new: true });

        if (!updatedLocation) {
            return res.status(404).json({ message: 'Localizacao não encontrada' });
        }

        res.status(200).json(updatedLocation);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api_/locations/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const location = await Location.findByIdAndDelete(id);
        if(!location){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(location);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// >>> Inclusions's Endpoints

app.get('/api_/inclusions', async(req, res) => {
    try {
        const inclusion = await Inclusion.find({});
        res.status(200).json(inclusion);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/inclusions', async(req, res) => {
    try {
        const inclusion = await Inclusion.create(req.body)
        res.status(200).json(inclusion);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/api_/inclusions/:id', async (req, res) => {
    try {
        const inclusionId = req.params.id;
        const updatedInclusion = await Inclusion.findByIdAndUpdate(inclusionId, req.body, { new: true });

        if (!updatedInclusion) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api_/inclusions/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const inclusion = await Inclusion.findByIdAndDelete(id);
        if(!inclusion){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(inclusion);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// >>> Age - Range's Endpoints

app.get('/api_/age-ranges', async(req, res) => {
    try {
        const ageRange = await AgeRange.find({});
        res.status(200).json(ageRange);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/age-ranges', async(req, res) => {
    try {
        const ageRange = await AgeRange.create(req.body)
        res.status(200).json(ageRange);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.delete('/api_/age-ranges/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const ageRange = await AgeRange.findByIdAndDelete(id);
        if(!ageRange){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(ageRange);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// >>> Exclusions's Endpoints

app.get('/api_/exclusions', async(req, res) => {
    try {
        const exclusion = await Exclusion.find({});
        res.status(200).json(exclusion);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/exclusions', async(req, res) => {
    try {
        const exclusion = await Exclusion.create(req.body)
        res.status(200).json(exclusion);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/api_/exclusions/:id', async (req, res) => {
    try {
        const exclusionId = req.params.id;
        const updatedExclusion = await Exclusion.findByIdAndUpdate(exclusionId, req.body, { new: true });

        if (!updatedExclusion) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        res.status(200).json(updatedExclusion);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api_/exclusions/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const exclusion = await Exclusion.findByIdAndDelete(id);
        if(!exclusion){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(exclusion);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// >>> Themes's Endpoints Classes

app.get('/api_/themes', async(req, res) => {
    try {
        const theme = await Theme.find({});
        res.status(200).json(theme);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/themes', async(req, res) => {
    try {
        const theme = await Theme.create(req.body)
        res.status(200).json(theme);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/api_/themes/:id', async (req, res) => {
    try {
        const themeId = req.params.id;
        const updatedTheme = await Theme.findByIdAndUpdate(themeId, req.body, { new: true });

        if (!updatedTheme) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        res.status(200).json(updatedTheme);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api_/themes/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const theme = await Theme.findByIdAndDelete(id);
        if(!theme){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(theme);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// >>> Group's Endpoints

app.get('/api_/groups', async(req, res) => {
    try {
        const group = await Group.find({});
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/groups', async(req, res) => {
    try {
        const group = await Group.create(req.body)
        res.status(200).json(language);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.delete('/api_/groups/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const group = await Group.findByIdAndDelete(id);
        if(!group){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(visa);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// >>> Languages's Endpoints

app.get('/api_/languages', async(req, res) => {
    try {
        const language = await Language.find({});
        res.status(200).json(language);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/languages', async(req, res) => {
    try {
        const language = await Language.create(req.body)
        res.status(200).json(language);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.delete('/api_/languages/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const language = await Language.findByIdAndDelete(id);
        if(!language){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(visa);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// >>> Classe's Endpoints

app.get('/api_/classes', async(req, res) => {
    try {
        const classe = await Classe.find({});
        res.status(200).json(classe);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.put('/api_/classes/categories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        // Atualizar a classe principal
        const updatedClasse = await Classe.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedClasse) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }

        // Atualizar o campo type em todos os registros na tabela Category onde additionalId é igual ao ID da classe locations
        const updateResult = await Category.updateMany({ additionalId: id }, { type: title });

        res.status(200).json({ updatedClasse, updatedCategories: updateResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.delete('/api_/classes/categories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Excluir a classe principal
        const classe = await Classe.findByIdAndDelete(id);
        if (!classe) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        
        // Excluir registros na tabela Category onde additionalId é igual ao ID da classe excluída
        const deleteResult = await Category.deleteMany({ additionalId: id });
        
        res.status(200).json({ deletedClasse: classe, deletedCategories: deleteResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// >>>
app.put('/api_/classes/themes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        // Atualizar a classe principal
        const updatedClasse = await Classe.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedClasse) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }

        // Atualizar o campo type em todos os registros na tabela Category onde additionalId é igual ao ID da classe
        const updateResult = await Theme.updateMany({ additionalId: id }, { type: title });

        res.status(200).json({ updatedClasse, updatedCategories: updateResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.delete('/api_/classes/themes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Excluir a classe principal
        const classe = await Classe.findByIdAndDelete(id);
        if (!classe) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        
        // Excluir registros na tabela Category onde additionalId é igual ao ID da classe excluída
        const deleteResult = await Theme.deleteMany({ additionalId: id });
        
        res.status(200).json({ deletedClasse: classe, deletedCategories: deleteResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api_/classes/inclusions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        // Atualizar a classe principal
        const updatedClasse = await Classe.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedClasse) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }

        // Atualizar o campo type em todos os registros na tabela Category onde additionalId é igual ao ID da classe
        const updateResult = await Inclusion.updateMany({ additionalId: id }, { type: title });

        res.status(200).json({ updatedClasse, updatedCategories: updateResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.delete('/api_/classes/inclusions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Excluir a classe principal
        const classe = await Classe.findByIdAndDelete(id);
        if (!classe) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        
        // Excluir registros na tabela Category onde additionalId é igual ao ID da classe excluída
        const deleteResult = await Inclusion.deleteMany({ additionalId: id });
        
        res.status(200).json({ deletedClasse: classe, deletedCategories: deleteResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// >>>
app.put('/api_/classes/exclusions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        // Atualizar a classe principal
        const updatedClasse = await Classe.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedClasse) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }

        // Atualizar o campo type em todos os registros na tabela Category onde additionalId é igual ao ID da classe
        const updateResult = await Exclusion.updateMany({ additionalId: id }, { type: title });

        res.status(200).json({ updatedClasse, updatedCategories: updateResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api_/classes/exclusions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Excluir a classe principal
        const classe = await Classe.findByIdAndDelete(id);
        if (!classe) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        
        // Excluir registros na tabela Category onde additionalId é igual ao ID da classe excluída
        const deleteResult = await Exclusion.deleteMany({ additionalId: id });
        
        res.status(200).json({ deletedClasse: classe, deletedCategories: deleteResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api_/classes/locations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        // Atualizar a classe principal
        const updatedClasse = await Classe.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedClasse) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }

        // Atualizar o campo type em todos os registros na tabela Category onde additionalId é igual ao ID da classe
        const updateResult = await Location.updateMany({ additionalId: id }, { type: title });

        res.status(200).json({ updatedClasse, updatedCategories: updateResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api_/classes/locations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Excluir a classe principal
        const classe = await Classe.findByIdAndDelete(id);
        if (!classe) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        
        // Excluir registros na tabela Category onde additionalId é igual ao ID da classe excluída
        const deleteResult = await Location.deleteMany({ additionalId: id });
        
        res.status(200).json({ deletedClasse: classe, deletedCategories: deleteResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.put('/api_/classes/pickup-places/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        // Atualizar a classe principal
        const updatedClasse = await Classe.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedClasse) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }

        // Atualizar o campo type em todos os registros na tabela Category onde additionalId é igual ao ID da classe
        const updateResult = await PickupPlace.updateMany({ additionalId: id }, { type: title });

        res.status(200).json({ updatedClasse, updatedCategories: updateResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api_/classes/pickup-places/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Excluir a classe principal
        const classe = await Classe.findByIdAndDelete(id);
        if (!classe) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        
        // Excluir registros na tabela Category onde additionalId é igual ao ID da classe excluída
        const deleteResult = await PickupPlace.deleteMany({ additionalId: id });
        
        res.status(200).json({ deletedClasse: classe, deletedCategories: deleteResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api_/classes/dropoff-places/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        // Atualizar a classe principal
        const updatedClasse = await Classe.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedClasse) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }

        // Atualizar o campo type em todos os registros na tabela Category onde additionalId é igual ao ID da classe
        const updateResult = await DropoffPlace.updateMany({ additionalId: id }, { type: title });

        res.status(200).json({ updatedClasse, updatedCategories: updateResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api_/classes/dropoff-places/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Excluir a classe principal
        const classe = await Classe.findByIdAndDelete(id);
        if (!classe) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        
        // Excluir registros na tabela Category onde additionalId é igual ao ID da classe excluída
        const deleteResult = await DropoffPlace.deleteMany({ additionalId: id });
        
        res.status(200).json({ deletedClasse: classe, deletedCategories: deleteResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api_/classes/what-to-bring/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        // Atualizar a classe principal
        const updatedClasse = await Classe.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedClasse) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }

        // Atualizar o campo type em todos os registros na tabela Category onde additionalId é igual ao ID da classe
        const updateResult = await WhatToBring.updateMany({ additionalId: id }, { type: title });

        res.status(200).json({ updatedClasse, updatedCategories: updateResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api_/classes/what-to-bring/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Excluir a classe principal
        const classe = await Classe.findByIdAndDelete(id);
        if (!classe) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        
        // Excluir registros na tabela Category onde additionalId é igual ao ID da classe excluída
        const deleteResult = await WhatToBring.deleteMany({ additionalId: id });
        
        res.status(200).json({ deletedClasse: classe, deletedCategories: deleteResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api_/classes/age-ranges/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        // Atualizar a classe principal
        const updatedClasse = await Classe.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedClasse) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }

        // Atualizar o campo type em todos os registros na tabela Category onde additionalId é igual ao ID da classe pickups
        const updateResult = await AgeRange.updateMany({ additionalId: id }, { type: title });

        res.status(200).json({ updatedClasse, updatedCategories: updateResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api_/classes/age-ranges/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Excluir a classe principal
        const classe = await Classe.findByIdAndDelete(id);
        if (!classe) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        
        // Excluir registros na tabela Category onde additionalId é igual ao ID da classe excluída
        const deleteResult = await AgeRange.deleteMany({ additionalId: id });
        
        res.status(200).json({ deletedClasse: classe, deletedCategories: deleteResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api_/classes/cancellation-policy/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        // Atualizar a classe principal
        const updatedClasse = await Classe.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedClasse) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }

        // Atualizar o campo type em todos os registros na tabela Category onde additionalId é igual ao ID da classe locations
        const updateResult = await CancellationPolicy.updateMany({ additionalId: id }, { type: title });

        res.status(200).json({ updatedClasse, updatedCategories: updateResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.delete('/api_/classes/cancellation-policy/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Excluir a classe principal
        const classe = await Classe.findByIdAndDelete(id);
        if (!classe) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        
        // Excluir registros na tabela Category onde additionalId é igual ao ID da classe excluída
        const deleteResult = await CancellationPolicy.deleteMany({ additionalId: id });
        
        res.status(200).json({ deletedClasse: classe, deletedCategories: deleteResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// >>> Classe's Sub-Endpoints additionalId
app.get('/api_/classes/themes', async (req, res) => {
    try {
        const classes = await Classe.find({ "options": "Themes" });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api_/classes/pickup-places', async (req, res) => {
    try {
        const classes = await Classe.find({ "options": "pickups" });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api_/classes/age-ranges', async (req, res) => {
    try {
        const classes = await Classe.find({ "options": "ages" });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api_/classes/dropoff-places', async (req, res) => {
    try {
        const classes = await Classe.find({ "options": "dropoffs" });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api_/classes/categories', async (req, res) => {
    try {
        const classes = await Classe.find({ "options": "categories" });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api_/classes/inclusions', async (req, res) => {
    try {
        const classes = await Classe.find({ "options": "inclusions" });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api_/classes/locations', async (req, res) => {
    try {
        const classes = await Classe.find({ "options": "locations" });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api_/classes/exclusions', async (req, res) => {
    try {
        const classes = await Classe.find({ "options": "exclusions" });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api_/classes/what-to-bring', async (req, res) => {
    try {
        const classes = await Classe.find({ "options": "whattobring" });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api_/classes/cancellation-policy', async (req, res) => {
    try {
        const classes = await Classe.find({ "options": "cp" });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/api_/classes', async(req, res) => {
    try {
        const classe = await Classe.create(req.body)
        res.status(200).json(classe);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.delete('/api_/classes/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const classe = await Classe.findByIdAndDelete(id);
        if(!classe){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(classe);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// >>> What to Bring's Endpoints

app.get('/api_/what-to-bring', async(req, res) => {
    try {
        const whatToBring = await WhatToBring.find({});
        res.status(200).json(whatToBring);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/api_/what-to-bring/:id', async (req, res) => {
    try {
        const whatToBringId = req.params.id;
        const updatedWhatToBring = await WhatToBring.findByIdAndUpdate(whatToBringId, req.body, { new: true });

        if (!updatedWhatToBring) {
            return res.status(404).json({ message: 'whatToBring não encontrada' });
        }

        res.status(200).json(updatedWhatToBring);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.post('/api_/what-to-bring', async(req, res) => {
    try {
        const whatToBring = await WhatToBring.create(req.body)
        res.status(200).json(whatToBring);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.delete('/api_/what-to-bring/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const whatToBring = await WhatToBring.findByIdAndDelete(id);
        if(!whatToBring){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(whatToBring);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// >>> Daily - Departure's Endpoints
app.get('/api_/daily-departure', async (req, res) => {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        let day = String(currentDate.getDate()).padStart(2, '0');
        const smallDate = `${year}-${month}-${day}`;

        const packageTours = await PackageTour.find({});
        const selectedPackageTours = [];

        packageTours.forEach(packageTour => {
            const packageStartDate = new Date(packageTour.startDate);
            const packageYear = packageStartDate.getFullYear();
            const packageMonth = String(packageStartDate.getMonth() + 1).padStart(2, '0');
            day = String(packageStartDate.getDate()).padStart(2, '0');
            if (day === '07') {
                day = '08'; // Adiciona +1 ao dia
            }
            const smallPackageDate = `${packageYear}-${packageMonth}-${day}`;
            console.log(smallPackageDate, "=", smallDate);
            if (smallPackageDate === smallDate) {
                selectedPackageTours.push(packageTour);
            }
        });

        res.status(200).json(selectedPackageTours);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// >>> Package-Tour's Endpoints
app.get('/api_/package-tour', async(req, res) => {
    try {
        const packageTour = await PackageTour.find({});
        res.status(200).json(packageTour);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api_/package-tour/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const packageTour = await PackageTour.findById(id);
        res.status(200).json(packageTour);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api_/package-tour', async(req, res) => {
    try {
        const packageTour = await PackageTour.create(req.body)
        res.status(200).json(packageTour);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/api_/package-tour/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const packageTour = await PackageTour.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!packageTour){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedPackageTour = await PackageTour.findById(id);
        res.status(200).json(updatedPackageTour);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb://localhost:27017/carros_db')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})





