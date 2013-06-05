using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Web.WebPages.OAuth;
using MvcApplication1.Models;

namespace MvcApplication1
{
    public static class AuthConfig
    {
        public static void RegisterAuth()
        {
            // To let users of this site log in using their accounts from other sites such as Microsoft, Facebook, and Twitter,
            // you must update this site. For more information visit http://go.microsoft.com/fwlink/?LinkID=252166

            //OAuthWebSecurity.RegisterMicrosoftClient(
            //    clientId: "",
            //    clientSecret: ""
            //);

            //OAuthWebSecurity.RegisterTwitterClient(
            //    consumerKey: "",
            //    consumerSecret: ""
            //);

            //OAuthWebSecurity.RegisterFacebookClient(
            //    appId: "138449529660928",
            //    appSecret: "1b593036d327888d42b1a2bd96262172"
            //);

            //OAuthWebSecurity.RegisterGoogleClient();
        }
    }
}
