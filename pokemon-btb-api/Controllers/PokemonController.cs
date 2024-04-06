using Microsoft.AspNetCore.Mvc;
using PokeApiNet;
using pokemon_btb_api.Clients;

namespace pokemon_btb_api.Controllers {
    /*
     * PokeApiNet will automatically cache calls it recognizes during each session
     */
    [ApiController]
    public class PokemonController : ControllerBase {
        private readonly ILogger<PokemonController> logger;
        private readonly IPokemonClient pokemonClient;
        public PokemonController(ILogger<PokemonController> logger, IPokemonClient pokemonClient)
        {
            this.logger = logger;   
            this.pokemonClient = pokemonClient;
        }

        [Route("pokemon/getPokemonByID")]
        [HttpGet]
        public Pokemon GetPokemonByID(int id)
        {
            logger.LogInformation("Getting data for Pokemon with ID " + id);

            var result = pokemonClient.GetPokemonByID(id);

            return result.Result;
        }

        [Route("pokemon/getPokemonByQuery")]
        [HttpGet]
        public List<Pokemon> GetPokemonByQuery(string query)
        {
            logger.LogInformation("Getting data for Pokemon that contains string" + query);

            var result = pokemonClient.GetPokemonByQuery(query);

            return result.Result;
        }

        [Route("pokemon/setupForQuery")]
        [HttpGet]
        public bool SetupForQuery()
        {
            logger.LogInformation("Builder is live, getting us ready");

            var result = pokemonClient.GetAllPossiblePokemon();

            return result.Result;
        }
    }
}
