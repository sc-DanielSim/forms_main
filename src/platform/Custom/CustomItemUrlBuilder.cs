using Microsoft.Extensions.DependencyInjection;
using Sitecore;
using Sitecore.Data.Items;
using Sitecore.DependencyInjection;
using Sitecore.Links.UrlBuilders;
using Sitecore.Sites;
using Sitecore.Web;
using Sitecore.XA.Foundation.Multisite;
using Sitecore.XA.Foundation.Multisite.LinkManagers;
using Sitecore.Diagnostics;
using System;

namespace XmCloudSXAStarter.Custom
{
    public class CustomtemUrlBuilder : Sitecore.XA.Foundation.Multisite.UrlBuilders.ItemUrlBuilder
    {
        /// <summary>
        ///     Initializes a new instance of the <see cref="MeccaItemUrlBuilder" /> class.
        /// </summary>
        /// <param name="defaultOptions">The defaultOptions<see cref="DefaultItemUrlBuilderOptions" />.</param>
        public CustomtemUrlBuilder(DefaultItemUrlBuilderOptions defaultOptions) : base(defaultOptions)
        {
        }

        /// <summary>
        ///     Check if referenced Item is a Mecca PIM imported Product/Brand/Category and infer corresponding PDP/PLP URL
        /// </summary>
        /// <param name="item">The item<see cref="Item" />.</param>
        /// <param name="options">The options<see cref="ItemUrlBuilderOptions" />.</param>
        /// <returns>The <see cref="string" />.</returns>
        public override string Build(Item item, ItemUrlBuilderOptions options)
        {
            LogDiagnostic("Building item url via CustomtemUrlBuilder");
            LogDiagnostic($"Item ID: {item.ID} | Item Name: {item.Name} | options.Site: {options.Site.Name} | context.Site: {Context.Site.Name}");
            LogDiagnostic($"Context.Request: {Context.Request} | Context.User: {Context.GetUserName()} | Context.GetSiteName: {Context.GetSiteName()} | context.Site: {Context.Site.Name}");

            if (item == null)
            {
                var result = base.Build(item, options);
                return result;
            }

            if (Context.Site == null || Context.Site.Name == "shell")
            {
                var result = base.Build(item, options);
                return result;
            }

            var fallbackUrl = base.Build(item, options);

            if (options.AlwaysIncludeServerUrl == false)
            {
                //var relativeUrl = LinkHelper.ConstructCustomRelativeUrl(item, fallbackUrl, Context.Item);
                var relativeUrl = fallbackUrl;
                return relativeUrl;
            }

            return fallbackUrl;
        }

        private void LogDiagnostic(string message)
        {
            Log.Info("CS0466423: " + message, this);
		}
    }
}