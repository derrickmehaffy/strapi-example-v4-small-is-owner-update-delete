"use strict";

/**
 * `isOwner` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const user = ctx.state.user;
    const entryId = ctx.params.id ? ctx.params.id : undefined;
    let entry = {};

    if (entryId) {
      entry = await strapi.entityService.findOne(
        "api::blog-post.blog-post",
        entryId,
        { populate: "*" }
      );
    }

    if (user.id !== entry.author.id) {
      return ctx.unauthorized("Hello Piwi");
    } else {
      return next();
    }
  };
};
