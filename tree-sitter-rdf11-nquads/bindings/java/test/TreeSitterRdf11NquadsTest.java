import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.rdf11nquads.TreeSitterRdf11Nquads;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterRdf11NquadsTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterRdf11Nquads.language()));
    }
}
