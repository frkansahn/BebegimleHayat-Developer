import createRepository from '~/repositories/Repository'

export default (ctx, inject) => {
  inject('repositories', createRepository(ctx.store, ctx.$axios, ctx.env))
}