using Microsoft.AspNetCore.Mvc;
using PokeApiNet;
using pokemon_btb_api.Clients;

namespace pokemon_btb_api.Controllers {
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
            logger.LogInformation("PokemonAPI was called. Getting data for Pokemon with ID " + id);

            var result = pokemonClient.GetPokemonByID(id);

            return result.Result;
        }
    }
}
