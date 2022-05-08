var express = require('express');
var router = express.Router();
var staffModel = require('../../src/staffModel');

router.get('/', async function (req, res, next) {
  try {
    if (!req.session?.store?.isAdmin) return res.redirect('/home');
    let pageStorage = { title: 'Staff', loggedIn: req.session?.store?.loggedIn, isAdmin: req.session?.store?.isAdmin };
    const staff = await staffModel.get();
    return res.render('admin/staff', { ...pageStorage, staff });
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
});

router.get('/add', async function (req, res, next) {
  try {
    if (!req.session?.store?.isAdmin) return res.redirect('/home');
    let pageStorage = { title: 'Agregar staff', loggedIn: req.session?.store?.loggedIn, isAdmin: req.session?.store?.isAdmin };
    return res.render('admin/staffForm', {...pageStorage, action: '/admin/staff/add', method: 'POST'});
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
});

router.post('/add', async function (req, res, next) {
  try {
    const staff = await staffModel.insert(req.body);
    if (!staff) return res.render('admin/staffForm', { ...pageStorage, alert: {type: 'danger', message: 'Error al crear staff.'}});
    return res.redirect('/admin/staff/add');
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
});

router.get('/:id/delete', async function (req, res, next) {
  try {
    if (!req.session?.store?.isAdmin) return res.redirect('/home');
    let pageStorage = { title: 'Staff', loggedIn: req.session?.store?.loggedIn, isAdmin: req.session?.store?.isAdmin };
    const idstaff = req.params.id;
    if (!idstaff) return res.render('admin/staff', {...pageStorage, staff, alert: { type: 'danger', message: 'Error al intentar eliminar staff'}});
    await staffModel.del(idstaff);
    return res.redirect('/admin/staff');
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
});

router.get('/:id/update', async function (req, res, next) {
  try {
    if (!req.session?.store?.isAdmin) return res.redirect('/home');
    let pageStorage = { title: 'Actualizar staff', loggedIn: req.session?.store?.loggedIn, isAdmin: req.session?.store?.isAdmin };
    const idstaff = req.params.id;
    if (!idstaff) return res.render('admin/staffForm', {...pageStorage, staff, alert: { type: 'danger', message: 'Error al actualizar staff'}});
    const staff = await staffModel.get(idstaff);
    if (!staff) return res.render('admin/staffForm', {...pageStorage, staff, alert: { type: 'danger', message: 'Error al actualizar staff'}});
    return res.render('admin/staffForm', {...pageStorage, staff, action: `/admin/staff/${idstaff}/update`, method: 'POST'});
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
});

router.post('/:id/update', async function (req, res, next) {
  try {
    let pageStorage = { title: 'Actualizar staff', loggedIn: req.session?.store?.loggedIn, isAdmin: req.session?.store?.isAdmin };
    const idstaff = req.params.id;
    if (!idstaff) return res.render('admin/staffForm', {...pageStorage, staff, alert: { type: 'danger', message: 'Error al actualizar staff'}});
    const staff = await staffModel.update(idstaff, req.body);
    if (!staff) return res.render('admin/staffForm', { ...pageStorage, alert: {type: 'danger', message: 'Error al actualizar staff.'}});
    return res.redirect(`/admin/staff/${idstaff}/update`);
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
});

module.exports = router;