var express = require('express');
var router = express.Router();
var novedadModel = require('../../src/novedadModel');

router.get('/', async function (req, res, next) {
  try {
    if (!req.session?.store?.isAdmin) return res.redirect('/home');
    let pageStorage = { title: 'Novedades', loggedIn: req.session?.store?.loggedIn, isAdmin: req.session?.store?.isAdmin };
    const novedades = await novedadModel.get();
    return res.render('admin/novedades', { ...pageStorage, novedades });
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
});

router.get('/add', async function (req, res, next) {
  try {
    if (!req.session?.store?.isAdmin) return res.redirect('/home');
    let pageStorage = { title: 'Agregar Novedad', loggedIn: req.session?.store?.loggedIn, isAdmin: req.session?.store?.isAdmin };
    return res.render('admin/novedadForm', {...pageStorage, action: '/admin/novedades/add', method: 'POST'});
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
});

router.post('/add', async function (req, res, next) {
  try {
    const novedad = await novedadModel.insert(req.body);
    if (!novedad) return res.render('admin/novedadForm', { ...pageStorage, alert: {type: 'danger', message: 'Error al crear novedad.'}});
    return res.redirect('/admin/novedades/add');
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
});

router.get('/:id/delete', async function (req, res, next) {
  try {
    if (!req.session?.store?.isAdmin) return res.redirect('/home');
    let pageStorage = { title: 'Novedades', loggedIn: req.session?.store?.loggedIn, isAdmin: req.session?.store?.isAdmin };
    const idnovedad = req.params.id;
    if (!idnovedad) return res.render('admin/novedades', {...pageStorage, novedades, alert: { type: 'danger', message: 'Error al intentar eliminar novedad'}});
    await novedadModel.del(idnovedad);
    return res.redirect('/admin/novedades');
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
});

router.get('/:id/update', async function (req, res, next) {
  try {
    if (!req.session?.store?.isAdmin) return res.redirect('/home');
    let pageStorage = { title: 'Actualizar Novedad', loggedIn: req.session?.store?.loggedIn, isAdmin: req.session?.store?.isAdmin };
    const idnovedad = req.params.id;
    if (!idnovedad) return res.render('admin/novedadForm', {...pageStorage, novedad, alert: { type: 'danger', message: 'Error al actualizar novedad'}});
    const novedad = await novedadModel.get(idnovedad);
    if (!novedad) return res.render('admin/novedadForm', {...pageStorage, novedades, alert: { type: 'danger', message: 'Error al actualizar novedad'}});
    return res.render('admin/novedadForm', {...pageStorage, novedad, action: `/admin/novedades/${idnovedad}/update`, method: 'POST'});
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
});

router.post('/:id/update', async function (req, res, next) {
  try {
    let pageStorage = { title: 'Actualizar Novedad', loggedIn: req.session?.store?.loggedIn, isAdmin: req.session?.store?.isAdmin };
    const idnovedad = req.params.id;
    if (!idnovedad) return res.render('admin/novedadForm', {...pageStorage, novedad, alert: { type: 'danger', message: 'Error al actualizar novedad'}});
    const novedad = await novedadModel.update(idnovedad, req.body);
    if (!novedad) return res.render('admin/novedadForm', { ...pageStorage, alert: {type: 'danger', message: 'Error al actualizar novedad.'}});
    return res.redirect(`/admin/novedades/${idnovedad}/update`);
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
});

module.exports = router;